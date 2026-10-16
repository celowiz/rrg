"""Baixa preços diários (fechamento ajustado) e grava data/prices.json + data/meta.json.

Fontes: B3 (API pública de estatísticas de índices) para Ibovespa, IFIX e índices
setoriais; Yahoo Finance (yfinance) para ações, FIIs, ETFs e índices dos EUA.
"""
import base64, datetime as dt, json, math, os, sys, time
import requests
import pandas as pd
import yfinance as yf
sys.path.insert(0, os.path.dirname(__file__))
from universe import *
from rrg import geometric_basket

START = dt.date(2018, 7, 1)  # mock v2: histórico estendido para cobrir Covid (mar/2020)
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..", "data")
B3_URL = "https://sistemaswebb3-listados.b3.com.br/indexStatisticsProxy/IndexCall/GetPortfolioDay/"

def b3_index(code):
    pts = {}
    for year in range(START.year, dt.date.today().year + 1):
        q = base64.b64encode(json.dumps({"language": "pt-br", "index": code, "year": str(year)}).encode()).decode()
        for attempt in range(3):
            try:
                r = requests.get(B3_URL + q, timeout=30, headers={"User-Agent": "Mozilla/5.0"})
                r.raise_for_status(); data = r.json(); break
            except Exception as e:
                if attempt == 2: raise
                time.sleep(2 + attempt * 3)
        for row in data.get("results", []):
            for m in range(1, 13):
                v = row.get(f"rateValue{m}")
                if v:
                    try:
                        pts[dt.date(year, m, row["day"])] = float(v.replace(".", "").replace(",", "."))
                    except ValueError:
                        pass
    if len(pts) < 200:
        raise RuntimeError(f"B3 {code}: só {len(pts)} pontos")
    return pd.Series(pts).sort_index()

def yf_batch(symbols):
    df = yf.download(symbols, start=START.isoformat(), auto_adjust=True, progress=False, threads=True, group_by="column")
    close = df["Close"] if isinstance(df.columns, pd.MultiIndex) else df[["Close"]].rename(columns={"Close": symbols[0]})
    return {s: close[s].dropna() for s in close.columns if close[s].dropna().size > 200}

def main():
    os.makedirs(OUT, exist_ok=True)
    series, info, notes = {}, {}, []
    # 1) índices B3
    for code, name in B3_INDICES.items():
        try:
            series[code] = b3_index(code); info[code] = {"name": name, "group": "idx_br", "source": "B3"}
        except Exception as e:
            fb = B3_FALLBACK.get(code)
            notes.append(f"{code}: B3 indisponível ({type(e).__name__}); " + (f"usando {fb} (Yahoo) como substituto" if fb else "série omitida"))
            if fb:
                s = yf_batch([fb]).get(fb)
                if s is not None:
                    series[code] = s; info[code] = {"name": name + f" (substituto: {fb})", "group": "idx_br", "source": "Yahoo Finance"}
    # 2) Yahoo
    groups = [("br", BR_STOCKS), ("fii", FIIS), ("us", US_STOCKS), ("sector_us", SPDR), ("etf", ETFS), ("idx_us", US_INDICES),
              ("country", COUNTRY), ("asset", ASSET_CLASS), ("factor", FACTOR), ("commod", COMMOD)]
    want = {}
    for g, d in groups:
        for t, n in d.items():
            want.setdefault(yf_symbol(t, g), (t, g, n))  # primeiro grupo vence (ex.: SPY, GLD)
    fx_syms = {f"{c}=X": c for c in FX}
    got = {}
    syms = list(want) + list(fx_syms)
    for i in range(0, len(syms), 40):
        got.update(yf_batch(syms[i:i + 40]))
    for sym, (t, g, n) in want.items():
        if sym in got:
            series[t] = got[sym]; info[t] = {"name": n, "group": g, "source": "Yahoo Finance"}
        else:
            notes.append(f"{t}: sem dados no Yahoo Finance, omitido")
    for sym, c in fx_syms.items():
        if sym in got:
            series[c] = 1.0 / got[sym]; info[c] = {"name": FX[c] + " (valor em USD)", "group": "fx", "source": "Yahoo Finance"}
        else:
            notes.append(f"{c}: sem cotação {sym} no Yahoo Finance, omitida da cesta")
    # 3) alinhamento por calendário unificado (ffill limitado, sem preencher antes do início)
    idx = sorted(set().union(*[set(pd.to_datetime(s.index).date) for s in series.values()]))
    idx = [d for d in idx if d.weekday() < 5 and d >= START]
    # descarta o dia corrente antes do fechamento (≈18:30 BRT): evita publicar preços intradiários
    now_brt = dt.datetime.now(dt.timezone(dt.timedelta(hours=-3)))
    if idx and idx[-1] >= now_brt.date() and (now_brt.hour, now_brt.minute) < (18, 30):
        idx = [d for d in idx if d < now_brt.date()]
    # descarta datas finais com cobertura < 50% (ex.: dia corrente só com moedas/cripto)
    raw_dates = [set(pd.to_datetime(s.index).date) for s in series.values()]
    while idx and sum(idx[-1] in r for r in raw_dates) < 0.5 * len(raw_dates):
        idx.pop()
    out = {}
    for t, s in series.items():
        s = s.copy(); s.index = pd.to_datetime(s.index).date
        s = s[~pd.Index(s.index).duplicated(keep="last")]
        a = s.reindex(idx).ffill(limit=5)
        first = s.index.min()
        out[t] = [None if (d < first or pd.isna(v)) else float(f"{v:.6g}") for d, v in zip(idx, a)]
    # cesta sintética de moedas: média geométrica (equal-weight, rebalanceada diariamente) dos valores em USD
    fxs = [c for c in FX if c in out]
    if len(fxs) >= 3:
        out[FX_BASKET] = [None if v is None else float(f"{v:.6g}") for v in geometric_basket([out[c] for c in fxs])]
        info[FX_BASKET] = {"name": f"Cesta sintética de moedas ({len(fxs)} moedas, equal-weight)", "group": "fx", "source": "calculada (Yahoo Finance)"}
    # nomes legíveis centralizados
    for t in info:
        if t in NAMES:
            nm, ds = NAMES[t]
            if "substituto" in info[t]["name"]: nm += " " + info[t]["name"][info[t]["name"].index("(substituto"):]
            info[t]["name"], info[t]["desc"] = nm, ds
        if t in NAMES_EN:
            info[t]["name_en"], info[t]["desc_en"] = NAMES_EN[t]
    presets = []
    for p in PRESETS:
        q = dict(p)
        if p["id"] in PRESETS_EN: q["name_en"], q["desc_en"] = PRESETS_EN[p["id"]]
        q["assets"] = [a for a in p["assets"] if a in out]
        missing = [a for a in p["assets"] if a not in out]
        if missing: notes.append(f"{p['name']}: sem dados para {', '.join(missing)}")
        if p["bench"] in out: presets.append(q)
    last = {t: max(i for i, v in enumerate(a) if v is not None) for t, a in out.items()}
    meta = {"generated_at": dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
            "last_date": idx[-1].isoformat(), "presets": presets, "info": info, "notes": notes,
            "last_by_ticker": {t: idx[i].isoformat() for t, i in last.items()}}
    # checagens de qualidade: benchmarks essenciais, cobertura mínima de cada modelo e dados recentes
    problems = [f"benchmark {c} ausente" for c in ["IBOV", "SPY", "URTH", "AOR", "DBC", FX_BASKET] if c not in out]
    for p in presets:
        if len(p["assets"]) < 4:
            problems.append(f"{p['name']}: só {len(p['assets'])} ativos")
    stale = [t for t, i in last.items() if (idx[-1] - idx[i]).days > 10]
    if stale:
        notes.append("Séries sem atualização recente (>10 dias): " + ", ".join(stale))
    json.dump({"dates": [d.isoformat() for d in idx], "series": out}, open(os.path.join(OUT, "prices.json"), "w"), separators=(",", ":"), allow_nan=False)
    json.dump(meta, open(os.path.join(OUT, "meta.json"), "w"), ensure_ascii=False, indent=1)
    print(f"{len(out)} séries, {len(idx)} datas, última {idx[-1]}"); print("\n".join(notes))
    if problems or len(out) < 80:
        sys.exit("dados insuficientes: " + "; ".join(problems))

if __name__ == "__main__":
    main()

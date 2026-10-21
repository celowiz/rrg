"""Gera data/summary.json: resumo pequeno (~3 KB) lido pela página Mercado Hoje do portfólio
(celowiz.github.io/mercado-hoje/).

- Setores B3 × Ibovespa (modelo "setbr"): RRG semanal, suavização 10, quadrante atual e rastro
  das últimas 5 semanas. Mesmo cálculo do site (scripts/rrg.py = js/rrg.js) e mesma amostragem
  semanal de js/rrg.js (weekEnds: último pregão de cada semana ISO).
- Últimos fechamentos do S&P 500 (^GSPC) e do dólar (USD/BRL = 1 / valor do real em USD),
  cada um com a data real do último dado (meta.last_by_ticker), sem contar dias preenchidos.

Só lê <out>/prices.json e <out>/meta.json gravados por scripts/fetch_data.py. Determinístico.
Uso: python scripts/summary.py _site/data
"""
import datetime as dt, json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from rrg import rrg, quadrant

SCHEMA = 1
N, TAIL = 10, 5
PRESETS = ("setbr",)


def week_ends(dates):
    """Índices do último pregão de cada semana ISO (igual a RRG.weekEnds em js/rrg.js)."""
    out, key = [], None
    for i, d in enumerate(dates):
        k = dt.date.fromisoformat(d).isocalendar()[:2]
        if k != key:
            out.append(i); key = k
        else:
            out[-1] = i
    return out


def preset_summary(prices, meta, pid):
    p = next((x for x in meta["presets"] if x["id"] == pid), None)
    if not p or p["bench"] not in prices["series"]:
        return None
    dates, S = prices["dates"], prices["series"]
    we = week_ends(dates)
    b = [S[p["bench"]][i] for i in we]
    items = []
    for t in p["assets"]:
        if t not in S:
            continue
        _, x, y = rrg([S[t][i] for i in we], b, N)
        if x[-1] is None or y[-1] is None:
            continue
        tx, ty = x[-TAIL:], y[-TAIL:]
        info = meta["info"].get(t, {})
        items.append({"t": t, "name": info.get("name"), "name_en": info.get("name_en"),
                      "x": round(x[-1], 2), "y": round(y[-1], 2), "q": quadrant(x[-1], y[-1]),
                      "tx": [None if v is None else round(v, 2) for v in tx], "ty": [None if v is None else round(v, 2) for v in ty]})
    last = dates[we[-1]]
    return {"id": pid, "name": p.get("name"), "name_en": p.get("name_en"), "bench": p["bench"], "freq": "weekly", "n": N, "tail": TAIL,
            "date": last, "week_complete": dt.date.fromisoformat(last).weekday() >= 4, "items": items}


def last_quote(prices, meta, t, invert=False):
    """Último fechamento real e o anterior. invert: devolve 1/valor (ex.: BRL em USD -> USD/BRL)."""
    s, dates = prices["series"].get(t), prices["dates"]
    real = meta.get("last_by_ticker", {}).get(t)
    if not s or real not in dates:
        return None
    i = dates.index(real)
    j = next((k for k in range(i - 1, -1, -1) if s[k] is not None), None)
    if s[i] is None or j is None:
        return None
    f = (lambda v: 1.0 / v) if invert else (lambda v: v)
    v, pv = f(s[i]), f(s[j])
    return {"date": real, "value": round(v, 4), "prev": round(pv, 4), "chg": round(v / pv - 1, 5)}


def build_summary(prices, meta):
    blocks = {pid: preset_summary(prices, meta, pid) for pid in PRESETS}
    quotes = {"spx": last_quote(prices, meta, "^GSPC"), "usdbrl": last_quote(prices, meta, "BRL", invert=True)}
    return {"schema": SCHEMA, "project": "rrg", "url": "https://celowiz.github.io/rrg/",
            "as_of": meta.get("last_date"), "generated_at": meta.get("generated_at"),
            "presets": {k: v for k, v in blocks.items() if v}, "quotes": {k: v for k, v in quotes.items() if v}}


def main(out):
    prices = json.load(open(os.path.join(out, "prices.json")))
    meta = json.load(open(os.path.join(out, "meta.json")))
    s = build_summary(prices, meta)
    if not s["presets"]:
        sys.exit("summary: nenhum preset disponível")
    path = os.path.join(out, "summary.json")
    json.dump(s, open(path, "w"), ensure_ascii=False, separators=(",", ":"))
    st = s["presets"]["setbr"]
    print(f"summary.json: {os.path.getsize(path)} bytes, semana {st['date']}: " + ", ".join(f"{i['t']}={i['q']}" for i in st["items"]))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..", "data"))

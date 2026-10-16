"""Cálculo do RRG (aproximação aberta do método JdK).

RS          = 100 * preço_ativo / preço_benchmark
s = max(2, round(n/2)),  k = max(1, round(n/3)),  L = 4n
raw         = 100 * EMA_s(RS) / SMA_n(RS)           (RS suavizado vs. sua média)
RS-Ratio    = 100 + (raw - 100) / RMS_L(raw - 100)  (normalizado em torno de 100)
roc         = EMA_s( 100 * RS-Ratio / RS-Ratio[t-k] )
RS-Momentum = 100 + (roc - 100) / RMS_L(roc - 100)

A normalização só reescala (não remove a média), então um ativo que supera o
benchmark de forma persistente continua à direita do centro.
A mesma fórmula é portada em js/rrg.js (testada contra tests/fixture.json).
"""
from __future__ import annotations
import math

def sma(a, n):
    out = [None] * len(a)
    for i in range(len(a)):
        w = a[i - n + 1:i + 1] if i >= n - 1 else None
        if w and all(v is not None for v in w):
            out[i] = sum(w) / n
    return out

def rolling_z(a, n):
    out = [None] * len(a)
    for i in range(n - 1, len(a)):
        w = a[i - n + 1:i + 1]
        if any(v is None for v in w):
            continue
        m = sum(w) / n
        sd = math.sqrt(sum((v - m) ** 2 for v in w) / n)
        out[i] = 0.0 if sd < 1e-12 else (a[i] - m) / sd
    return out

def scale(a, L):
    """100 + (v-100)/RMS das últimas L observações de (v-100)."""
    out = [None] * len(a)
    for i in range(len(a)):
        w = [v - 100.0 for v in a[max(0, i - L + 1):i + 1] if v is not None]
        if a[i] is None or len(w) < max(3, L // 2):
            continue
        rms = math.sqrt(sum(d * d for d in w) / len(w))
        out[i] = 100.0 if rms < 1e-12 else 100.0 + (a[i] - 100.0) / rms
    return out

def ema(a, n):
    out, e, al = [], None, 2.0 / (n + 1)
    for v in a:
        if v is None:
            out.append(None); continue
        e = v if e is None else e + al * (v - e)
        out.append(e)
    return out

def relative_strength(price, bench):
    return [None if p is None or b is None or b == 0 else 100.0 * p / b for p, b in zip(price, bench)]

def rrg(price, bench, n=10):
    rs = relative_strength(price, bench)
    ma = sma(rs, n)
    sm, k, L = max(2, round(n / 2)), max(1, round(n / 3)), 4 * n
    er = ema(rs, sm)
    raw = [None if r is None or m is None or m == 0 else 100.0 * r / m for r, m in zip(er, ma)]
    ratio = scale(raw, L)
    roc = [None] * len(ratio)
    for i in range(k, len(ratio)):
        if ratio[i] is not None and ratio[i - k] is not None:
            roc[i] = 100.0 * ratio[i] / ratio[i - k]
    mom = scale(ema(roc, sm), L)
    return rs, ratio, mom

def quadrant(x, y):
    if x >= 100:
        return "L" if y >= 100 else "W"
    return "I" if y >= 100 else "G"

def weekly(dates, values):
    """Último valor válido de cada semana ISO. dates: 'YYYY-MM-DD'."""
    import datetime as dt
    out_d, out_v, key = [], [], None
    for d, v in zip(dates, values):
        k = dt.date.fromisoformat(d).isocalendar()[:2]
        if k != key:
            out_d.append(d); out_v.append(v); key = k
        else:
            out_d[-1] = d
            if v is not None or out_v[-1] is None:
                out_v[-1] = v if v is not None else out_v[-1]
    return out_d, out_v

def geometric_basket(columns):
    """Cesta equal-weight rebalanceada a cada período: média geométrica dos valores.
    columns: lista de séries alinhadas; None se faltar qualquer componente."""
    out = []
    for vals in zip(*columns):
        out.append(None if any(v is None or v <= 0 for v in vals) else math.exp(sum(math.log(v) for v in vals) / len(vals)))
    return out

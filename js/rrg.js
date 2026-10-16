// Cálculo do RRG — porta fiel de scripts/rrg.py (ver docstring lá). Testado em tests/rrg.test.mjs.
(function (root) {
  function sma(a, n) { const o = new Array(a.length).fill(null);
    for (let i = n - 1; i < a.length; i++) { let s = 0, ok = true; for (let k = i - n + 1; k <= i; k++) { if (a[k] == null) { ok = false; break } s += a[k] } if (ok) o[i] = s / n } return o }
  function scale(a, L) { const o = new Array(a.length).fill(null), need = Math.max(3, Math.floor(L / 2));
    for (let i = 0; i < a.length; i++) { if (a[i] == null) continue; let s = 0, c = 0;
      for (let k = Math.max(0, i - L + 1); k <= i; k++) if (a[k] != null) { const d = a[k] - 100; s += d * d; c++ }
      if (c < need) continue; const rms = Math.sqrt(s / c); o[i] = rms < 1e-12 ? 100 : 100 + (a[i] - 100) / rms } return o }
  function ema(a, n) { let e = null; const al = 2 / (n + 1); return a.map(v => v == null ? null : (e = e == null ? v : e + al * (v - e))) }
  function relativeStrength(p, b) { return p.map((v, i) => v == null || b[i] == null || b[i] === 0 ? null : 100 * v / b[i]) }
  // Python round() usa arredondamento bancário; replicado aqui para paridade
  const pyRound = v => { const f = Math.floor(v), d = v - f; return d > .5 ? f + 1 : d < .5 ? f : (f % 2 ? f + 1 : f) };
  function rrg(p, b, n) { const rs = relativeStrength(p, b), ma = sma(rs, n), sm = Math.max(2, pyRound(n / 2)), k = Math.max(1, pyRound(n / 3)), L = 4 * n;
    const er = ema(rs, sm), raw = er.map((r, i) => r == null || ma[i] == null || ma[i] === 0 ? null : 100 * r / ma[i]);
    const ratio = scale(raw, L), roc = ratio.map((v, i) => i >= k && v != null && ratio[i - k] != null ? 100 * v / ratio[i - k] : null);
    return { rs, x: ratio, y: scale(ema(roc, sm), L) } }
  const quadrant = (x, y) => x >= 100 ? (y >= 100 ? 'L' : 'W') : (y >= 100 ? 'I' : 'G');
  function isoWeek(s) { const d = new Date(s + 'T12:00:00Z'), day = (d.getUTCDay() + 6) % 7; d.setUTCDate(d.getUTCDate() - day + 3);
    const y = d.getUTCFullYear(), j = new Date(Date.UTC(y, 0, 4)); return y * 100 + 1 + Math.round(((d - j) / 864e5 - 3 + ((j.getUTCDay() + 6) % 7)) / 7) }
  // índices (no array diário) do último dia de cada semana
  function weekEnds(dates) { const o = []; let key = null; dates.forEach((d, i) => { const k = isoWeek(d); if (k !== key) { o.push(i); key = k } else o[o.length - 1] = i }); return o }
  const api = { ema, pyRound, sma, scale, relativeStrength, rrg, quadrant, weekEnds, isoWeek };
  if (typeof module !== 'undefined') module.exports = api; else root.RRG = api;
})(this);

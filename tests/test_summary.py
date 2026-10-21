import datetime as dt, json, math, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "scripts"))
import summary as S
from rrg import quadrant


def fixture(weeks=80):
    d0 = dt.date(2025, 1, 6)
    dates = [(d0 + dt.timedelta(days=w * 7 + k)).isoformat() for w in range(weeks) for k in range(5)]
    n = len(dates)
    series = {"IBOV": [100.0] * n,
              "UP": [100 * 1.002 ** i for i in range(n)],
              "DN": [100 * 0.998 ** i for i in range(n)],
              "^GSPC": [5000.0 + i for i in range(n - 1)] + [None],
              "BRL": [0.2] * (n - 1) + [0.25]}
    meta = {"generated_at": "2026-10-20T22:40:00Z", "last_date": dates[-1],
            "presets": [{"id": "setbr", "name": "Setores", "name_en": "Sectors", "bench": "IBOV", "assets": ["UP", "DN", "MISSING"]}],
            "info": {"UP": {"name": "Sobe", "name_en": "Up"}, "DN": {"name": "Cai"}},
            "last_by_ticker": {"^GSPC": dates[-2], "BRL": dates[-1]}}
    return {"dates": dates, "series": series}, meta


def test_week_ends_matches_js():
    assert S.week_ends(["2026-10-05", "2026-10-06", "2026-10-09", "2026-10-12", "2026-10-13"]) == [2, 4]
    assert S.week_ends(["2025-12-31", "2026-01-02", "2026-01-05"]) == [1, 2]


def test_preset_quadrants_and_tail():
    prices, meta = fixture()
    s = S.build_summary(prices, meta)
    st = s["presets"]["setbr"]
    by = {i["t"]: i for i in st["items"]}
    assert set(by) == {"UP", "DN"}  # ausente no prices é ignorado
    assert by["UP"]["x"] > 100 and by["DN"]["x"] < 100
    assert all(len(i["tx"]) == S.TAIL == len(i["ty"]) for i in st["items"])
    # quadrante vem dos valores sem arredondar; longe do centro bate com os arredondados
    assert all(i["q"] == quadrant(i["x"], i["y"]) for i in st["items"] if abs(i["y"] - 100) > .01)
    assert by["UP"]["q"] in "LW" and by["DN"]["q"] in "GI"
    assert st["week_complete"] and st["date"] == prices["dates"][-1]


def test_quotes_use_real_last_date_and_invert():
    prices, meta = fixture()
    q = S.build_summary(prices, meta)["quotes"]
    assert q["spx"]["date"] == prices["dates"][-2] and q["spx"]["value"] == prices["series"]["^GSPC"][-2]
    assert math.isclose(q["usdbrl"]["value"], 4.0) and math.isclose(q["usdbrl"]["prev"], 5.0)
    assert math.isclose(q["usdbrl"]["chg"], -0.2)


def test_small_and_deterministic():
    prices, meta = fixture()
    a, b = S.build_summary(prices, meta), S.build_summary(prices, meta)
    assert a == b and len(json.dumps(a)) < 20_000

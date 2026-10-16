import json, math, os, random, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "scripts"))
from rrg import sma, rolling_z, relative_strength, rrg, quadrant, weekly

def test_sma():
    assert sma([1, 2, 3, 4], 2) == [None, 1.5, 2.5, 3.5]
    assert sma([1, None, 3, 4], 2) == [None, None, None, 3.5]

def test_rolling_z_constant_is_zero():
    assert rolling_z([5.0] * 6, 3)[2:] == [0.0] * 4

def test_rolling_z_value():
    z = rolling_z([1.0, 2.0, 3.0], 3)[2]
    assert math.isclose(z, (3 - 2) / math.sqrt(2 / 3))

def test_rs_basic():
    assert relative_strength([10, 20, None], [10, 10, 5]) == [100.0, 200.0, None]

def test_identical_asset_sits_on_center():
    p = [100 * 1.01 ** i for i in range(80)]
    rs, x, y = rrg(p, p, 10)
    assert all(math.isclose(v, 100) for v in rs)
    assert math.isclose(x[-1], 100) and math.isclose(y[-1], 100)

def test_outperformer_goes_right_and_up():
    b = [100.0] * 80
    p = [100.0] * 60 + [100 * 1.02 ** i for i in range(1, 21)]
    _, x, y = rrg(p, b, 10)
    assert x[-1] > 100 and quadrant(x[-1], y[-1]) in ("L", "W")
    assert y[60] > 100  # aceleração inicial empurra o momentum

def test_persistent_outperformer_stays_right():
    b = [100.0] * 120
    p = [100.0] * 60 + [100 * 1.01 ** i for i in range(1, 61)]
    _, x, _ = rrg(p, b, 10)
    assert x[-1] > 100

def test_underperformer_lagging():
    b = [100 * 1.01 ** i for i in range(80)]
    p = [100.0] * 60 + [100 * 0.98 ** i for i in range(1, 21)]
    _, x, _ = rrg(p, b, 10)
    assert x[-1] < 100

def test_quadrants():
    assert [quadrant(101, 101), quadrant(101, 99), quadrant(99, 99), quadrant(99, 101)] == list("LWGI")

def test_weekly_resample():
    d = ["2026-10-05", "2026-10-06", "2026-10-09", "2026-10-12", "2026-10-13"]
    assert weekly(d, [1, 2, None, 4, 5]) == (["2026-10-09", "2026-10-13"], [2, 5])

def test_fixture_for_js_parity():
    """Gera/valida a fixture usada pelo teste JS (tests/rrg.test.mjs)."""
    r = random.Random(7)
    p, b = [100.0], [100.0]
    for i in range(119):
        b.append(b[-1] * math.exp(r.gauss(0, .02)))
        p.append(p[-1] * math.exp(r.gauss(0, .02) + .01 * math.sin(i / 6)))
    rs, x, y = rrg(p, b, 10)
    fx = {"price": p, "bench": b, "n": 10, "rs": rs, "x": x, "y": y}
    path = os.path.join(os.path.dirname(__file__), "fixture.json")
    if os.path.exists(path):
        old = json.load(open(path))
        for k in ("x", "y"):
            for a, c in zip(old[k], fx[k]):
                assert (a is None and c is None) or math.isclose(a, c, rel_tol=1e-9)
    else:
        json.dump(fx, open(path, "w"))

def test_geometric_basket():
    from rrg import geometric_basket
    b = geometric_basket([[1.0, 2.0, None], [4.0, 8.0, 1.0]])
    assert math.isclose(b[0], 2.0) and math.isclose(b[1], 4.0) and b[2] is None
    # cada moeda subindo 10% => cesta sobe 10%
    b = geometric_basket([[1.0, 1.1], [0.5, 0.55], [2.0, 2.2]])
    assert math.isclose(b[1] / b[0], 1.1)

def test_basket_member_rs_neutral():
    """Se todas as moedas andam juntas, a força relativa vs a cesta fica constante."""
    from rrg import geometric_basket
    a = [100 * 1.01 ** i for i in range(80)]
    c = [50 * 1.01 ** i for i in range(80)]
    bk = geometric_basket([a, c])
    rs, x, y = rrg(a, bk, 10)
    assert max(rs) - min(rs) < 1e-9 and math.isclose(x[-1], 100)

def test_universe_names_and_presets():
    import universe as U
    for p in U.PRESETS:
        assert p.get("desc"), p["id"]
        for t in p["assets"] + [p["bench"]]:
            assert t in U.NAMES, t
            nm, ds = U.NAMES[t]
            assert nm and ds
    assert len({p["id"] for p in U.PRESETS}) == len(U.PRESETS) == 10

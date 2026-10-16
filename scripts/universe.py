"""Universo de ativos. 'src': b3 (índices B3, API pública) ou yf (Yahoo Finance via yfinance)."""
B3_INDICES = {
    "IBOV": "Ibovespa", "IFNC": "Índice Financeiro", "IMAT": "Índice de Materiais Básicos",
    "ICON": "Índice de Consumo", "IEEX": "Índice de Energia Elétrica", "UTIL": "Índice Utilidade Pública",
    "IMOB": "Índice Imobiliário", "INDX": "Índice do Setor Industrial", "IFIX": "Índice de FIIs",
    "SMLL": "Small Caps", "IDIV": "Índice Dividendos",
}
# fallback em yfinance caso a B3 falhe
B3_FALLBACK = {"IBOV": "^BVSP", "IFIX": "XFIX11.SA", "SMLL": "SMAL11.SA", "IDIV": "DIVO11.SA"}

BR_STOCKS = {
    "PETR4": "Petrobras PN", "VALE3": "Vale ON", "ITUB4": "Itaú Unibanco PN", "BBDC4": "Bradesco PN",
    "BBAS3": "Banco do Brasil ON", "B3SA3": "B3 ON", "WEGE3": "WEG ON", "ABEV3": "Ambev ON",
    "PRIO3": "PRIO ON", "SUZB3": "Suzano ON", "BPAC11": "BTG Pactual Unit", "SBSP3": "Sabesp ON",
    "ITSA4": "Itaúsa PN", "PETR3": "Petrobras ON", "GGBR4": "Gerdau PN", "RENT3": "Localiza ON",
    "EQTL3": "Equatorial ON", "RADL3": "Raia Drogasil ON", "VIVT3": "Vivo ON", "TOTS3": "Totvs ON",
    "LREN3": "Lojas Renner ON", "CMIG4": "Cemig PN", "RDOR3": "Rede D'Or ON", "SANB11": "Santander Unit",
    "TAEE11": "Taesa Unit", "KLBN11": "Klabin Unit", "CSAN3": "Cosan ON",
    "MGLU3": "Magazine Luiza ON", "CSNA3": "CSN ON", "HAPV3": "Hapvida ON", "RAIL3": "Rumo ON",
}
FIIS = {
    "HGLG11": "CSHG Logística", "KNRI11": "Kinea Renda Imobiliária", "MXRF11": "Maxi Renda",
    "XPML11": "XP Malls", "VISC11": "Vinci Shopping Centers", "BTLG11": "BTG Logística",
    "KNCR11": "Kinea Rendimentos", "HGRU11": "CSHG Renda Urbana", "XPLG11": "XP Log",
    "KNIP11": "Kinea Índices de Preços", "HGRE11": "CSHG Real Estate", "CPTS11": "Capitânia Securities",
}
US_STOCKS = {
    "AAPL": "Apple", "MSFT": "Microsoft", "NVDA": "Nvidia", "AMZN": "Amazon", "GOOGL": "Alphabet",
    "META": "Meta", "AVGO": "Broadcom", "JPM": "JPMorgan", "XOM": "Exxon Mobil", "LLY": "Eli Lilly",
    "BRK-B": "Berkshire Hathaway B", "TSLA": "Tesla", "V": "Visa", "MA": "Mastercard",
    "UNH": "UnitedHealth", "HD": "Home Depot", "COST": "Costco", "WMT": "Walmart", "NFLX": "Netflix",
    "ORCL": "Oracle", "AMD": "AMD", "KO": "Coca-Cola", "PEP": "PepsiCo", "JNJ": "Johnson & Johnson",
}
SPDR = {
    "XLK": "Tecnologia", "XLF": "Financeiro", "XLE": "Energia", "XLV": "Saúde",
    "XLY": "Consumo discricionário", "XLP": "Consumo básico", "XLI": "Industrial", "XLB": "Materiais",
    "XLU": "Utilidades", "XLRE": "Imobiliário", "XLC": "Comunicação",
}
ETFS = {
    "BOVA11": "ETF Ibovespa", "SMAL11": "ETF Small Caps", "IVVB11": "ETF S&P 500 em reais",
    "XFIX11": "ETF IFIX", "SPY": "SPDR S&P 500 ETF", "QQQ": "Invesco Nasdaq-100",
    "IWM": "iShares Russell 2000", "EFA": "iShares MSCI EAFE", "EEM": "iShares MSCI Emerging",
    "GLD": "SPDR Gold", "TLT": "iShares 20+ Year Treasury", "EWZ": "iShares MSCI Brazil",
}
US_INDICES = {"^GSPC": "S&P 500", "^IXIC": "Nasdaq Composite", "^DJI": "Dow Jones"}

def yf_symbol(t, group):
    return t + ".SA" if group in ("br", "fii") or (group == "etf" and t[-2:] == "11") else t

PRESETS = [
    {"id": "setbr", "name": "Setores Brasil × Ibovespa", "bench": "IBOV",
     "assets": ["IFNC", "IMAT", "ICON", "IEEX", "UTIL", "IMOB", "INDX"]},
    {"id": "acbr", "name": "Ações Brasil × Ibovespa", "bench": "IBOV",
     "assets": ["PETR4", "VALE3", "ITUB4", "BBDC4", "BBAS3", "B3SA3", "WEGE3", "ABEV3", "PRIO3", "SUZB3", "BPAC11", "SBSP3"]},
    {"id": "fii", "name": "FIIs × IFIX", "bench": "IFIX",
     "assets": ["HGLG11", "KNRI11", "MXRF11", "XPML11", "VISC11", "BTLG11", "KNCR11", "HGRU11"]},
    {"id": "spx", "name": "Ações S&P × S&P 500", "bench": "SPY",
     "assets": ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "AVGO", "JPM", "XOM", "LLY", "BRK-B", "TSLA"]},
    {"id": "setus", "name": "Setores EUA × S&P 500", "bench": "SPY", "assets": list(SPDR)},
]

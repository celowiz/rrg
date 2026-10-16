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
COUNTRY = {
    "URTH": "MSCI World (iShares)", "ACWI": "MSCI ACWI (iShares)", "EWZ": "Brasil", "SPY": "EUA (S&P 500)",
    "EWJ": "Japão", "MCHI": "China", "INDA": "Índia", "EWG": "Alemanha", "EWU": "Reino Unido",
    "EWC": "Canadá", "EWA": "Austrália", "EWY": "Coreia do Sul", "EWT": "Taiwan", "EWW": "México",
}
ASSET_CLASS = {
    "AOR": "Carteira 60/40 global (iShares)", "VEU": "Ações globais ex-EUA", "EEM": "Ações emergentes",
    "TLT": "Treasuries 20+ anos", "LQD": "Crédito corporativo IG", "GLD": "Ouro", "GSG": "Commodities (GSCI)",
    "VNQ": "Imobiliário EUA (REITs)", "UUP": "Dólar americano (índice)", "BTC-USD": "Bitcoin",
}
FACTOR = {
    "MTUM": "Momentum", "VLUE": "Valor", "IWF": "Crescimento (Russell 1000 Growth)", "QUAL": "Qualidade",
    "USMV": "Mínima volatilidade", "IWM": "Small caps (Russell 2000)", "SCHD": "Dividendos",
}
COMMOD = {
    "DBC": "Commodities diversificadas (DBC)", "USO": "Petróleo WTI", "UNG": "Gás natural", "SLV": "Prata",
    "CPER": "Cobre", "DBA": "Agrícolas", "CORN": "Milho", "WEAT": "Trigo", "PICK": "Mineradoras globais",
}
# moedas: Yahoo "XXX=X" = USD/XXX; guardamos o valor da moeda em USD (inverso)
FX = {"BRL": "Real", "EUR": "Euro", "JPY": "Iene", "GBP": "Libra", "MXN": "Peso mexicano",
      "CNY": "Yuan", "AUD": "Dólar australiano", "CAD": "Dólar canadense", "CHF": "Franco suíço"}
FX_BASKET = "FXBASKET"

US_INDICES = {"^GSPC": "S&P 500", "^IXIC": "Nasdaq Composite", "^DJI": "Dow Jones"}

def yf_symbol(t, group):
    return t + ".SA" if group in ("br", "fii") or (group == "etf" and t[-2:] == "11") else t

PRESETS = [
    {"id": "setbr", "name": "Setores Brasil × Ibovespa", "bench": "IBOV",
     "desc": "Índices setoriais da B3 contra o Ibovespa: financeiro, materiais básicos, consumo, energia elétrica, utilidade pública, imobiliário e industrial. Ajuda a ver quais setores lideram o mercado brasileiro.",
     "assets": ["IFNC", "IMAT", "ICON", "IEEX", "UTIL", "IMOB", "INDX"]},
    {"id": "acbr", "name": "Ações Brasil × Ibovespa", "bench": "IBOV",
     "desc": "Ações líquidas de grande capitalização contra o Ibovespa (units como BPAC11 entram como ações). Preços ajustados por proventos.",
     "assets": ["PETR4", "VALE3", "ITUB4", "BBDC4", "BBAS3", "B3SA3", "WEGE3", "ABEV3", "PRIO3", "SUZB3", "BPAC11", "SBSP3"]},
    {"id": "fii", "name": "FIIs × IFIX", "bench": "IFIX",
     "desc": "Fundos imobiliários de tijolo e de papel contra o IFIX. Preços ajustados por rendimentos, como o próprio índice.",
     "assets": ["HGLG11", "KNRI11", "MXRF11", "XPML11", "VISC11", "BTLG11", "KNCR11", "HGRU11"]},
    {"id": "spx", "name": "Ações S&P × S&P 500", "bench": "SPY",
     "desc": "Grandes empresas americanas contra o S&P 500 (SPY, com dividendos). Mostra quais megacaps puxam o índice.",
     "assets": ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "AVGO", "JPM", "XOM", "LLY", "BRK-B", "TSLA"]},
    {"id": "setus", "name": "Setores EUA × S&P 500", "bench": "SPY", "assets": list(SPDR),
     "desc": "Os 11 ETFs setoriais SPDR contra o S&P 500. É o uso clássico do RRG para acompanhar a rotação setorial nos EUA."},
    {"id": "paises", "name": "Países × MSCI World", "bench": "URTH",
     "assets": ["EWZ", "SPY", "EWJ", "MCHI", "INDA", "EWG", "EWU", "EWC", "EWA", "EWY", "EWT", "EWW"],
     "desc": "ETFs de ações de cada país, em dólares, contra o MSCI World (URTH). Mostra para onde a força relativa global está girando. Note que o desempenho inclui o efeito do câmbio de cada país contra o dólar."},
    {"id": "classes", "name": "Classes de ativos × 60/40", "bench": "AOR",
     "assets": ["SPY", "VEU", "EEM", "TLT", "LQD", "GLD", "GSG", "VNQ", "UUP", "BTC-USD"],
     "desc": "Grandes classes (ações, juros longos, crédito, ouro, commodities, imóveis, dólar e bitcoin) contra uma carteira global 60% ações / 40% renda fixa (AOR). Ajuda a ver quais classes puxam ou seguram uma carteira balanceada. Bitcoin usa BTC-USD porque o IBIT tem histórico curto."},
    {"id": "fatores", "name": "Fatores EUA × S&P 500", "bench": "SPY",
     "assets": ["MTUM", "VLUE", "IWF", "QUAL", "USMV", "IWM", "SCHD"],
     "desc": "Fatores são características que explicam parte dos retornos: <b>Momentum</b> (MTUM, quem vem subindo), <b>Valor</b> (VLUE, empresas baratas em relação a lucros e patrimônio), <b>Crescimento</b> (IWF, lucros crescendo rápido), <b>Qualidade</b> (QUAL, balanços sólidos e alta rentabilidade), <b>Mínima volatilidade</b> (USMV, ações mais estáveis), <b>Tamanho</b> (IWM, small caps) e <b>Dividendos</b> (SCHD). O RRG mostra qual estilo está em alta contra o índice amplo."},
    {"id": "commod", "name": "Commodities × DBC", "bench": "DBC",
     "assets": ["USO", "UNG", "GLD", "SLV", "CPER", "DBA", "CORN", "WEAT", "PICK"],
     "desc": "ETFs de energia, metais e agrícolas contra uma cesta diversificada de commodities (DBC). Lembre que ETFs de futuros (USO, UNG, CORN, WEAT) sofrem com o custo de rolagem dos contratos, o que pesa no desempenho de longo prazo."},
    {"id": "moedas", "name": "Moedas × cesta sintética", "bench": FX_BASKET,
     "assets": ["BRL", "EUR", "JPY", "GBP", "MXN", "CNY", "AUD", "CAD", "CHF"],
     "desc": "Cada moeda é medida pelo seu valor em dólares (inverso de USD/XXX) e comparada a uma <b>cesta sintética</b> equal-weight: a média geométrica dos valores em USD de todas as moedas da lista, rebalanceada diariamente. À direita do centro, a moeda está se valorizando mais que a média do grupo. Não inclui o diferencial de juros (carry)."},
]

# ---------------------------------------------------------------------------
# Mapa central de nomes legíveis (pt-BR): ticker -> (nome curto, descrição).
# Usado em todo o app (gráfico, legenda, tabela, detalhe, busca e benchmark).
# Ações individuais usam o nome da empresa (dicionários acima) e descrição genérica.
NAMES = {
    # índices B3
    "IBOV": ("Ibovespa", "Principal índice de ações da B3"),
    "IFNC": ("Índice Financeiro B3", "Bancos, seguradoras e serviços financeiros"),
    "IMAT": ("Índice de Materiais Básicos B3", "Mineração, siderurgia, papel e química"),
    "ICON": ("Índice de Consumo B3", "Varejo, alimentos, bebidas e consumo cíclico/não cíclico"),
    "IEEX": ("Índice de Energia Elétrica B3", "Geradoras, transmissoras e distribuidoras de energia"),
    "UTIL": ("Índice Utilidade Pública B3", "Energia, saneamento e gás"),
    "IMOB": ("Índice Imobiliário B3", "Construtoras, incorporadoras e shoppings"),
    "INDX": ("Índice do Setor Industrial B3", "Empresas industriais de bens de capital e manufatura"),
    "IFIX": ("IFIX · Índice de FIIs", "Índice dos fundos imobiliários negociados na B3"),
    "SMLL": ("Índice Small Caps B3", "Ações de menor capitalização da B3"),
    "IDIV": ("Índice Dividendos B3", "Ações com maiores dividendos da B3"),
    # índices EUA
    "^GSPC": ("S&P 500 (índice)", "500 maiores empresas dos EUA, sem dividendos"),
    "^IXIC": ("Nasdaq Composite", "Ações listadas na Nasdaq, forte peso em tecnologia"),
    "^DJI": ("Dow Jones", "30 grandes empresas industriais dos EUA"),
    # ETFs gerais
    "BOVA11": ("ETF do Ibovespa", "Replica o Ibovespa"), "SMAL11": ("ETF Small Caps BR", "Replica o índice Small Caps da B3"),
    "IVVB11": ("ETF S&P 500 em reais", "S&P 500 cotado em reais (inclui variação do dólar)"),
    "XFIX11": ("ETF do IFIX", "Replica o índice de FIIs"),
    "SPY": ("S&P 500 · Ações dos EUA", "ETF do S&P 500 (com dividendos)"),
    "QQQ": ("Nasdaq-100", "100 maiores empresas não financeiras da Nasdaq"),
    "IWM": ("Small caps EUA (Russell 2000)", "Fator tamanho: empresas menores dos EUA"),
    "EFA": ("Ações de desenvolvidos ex-EUA", "Europa, Japão e Pacífico (MSCI EAFE)"),
    "EEM": ("Ações de emergentes", "China, Índia, Taiwan, Brasil e outros (MSCI EM)"),
    "GLD": ("Ouro", "ETF lastreado em ouro físico"), "TLT": ("Títulos do Tesouro EUA 20+ anos", "Juros longos americanos"),
    "EWZ": ("Ações do Brasil (em USD)", "MSCI Brazil, cotado em dólar"),
    # países
    "URTH": ("MSCI World (países desenvolvidos)", "Ações de 23 países desenvolvidos"),
    "ACWI": ("MSCI ACWI (mundo todo)", "Ações de países desenvolvidos e emergentes"),
    "EWJ": ("Ações do Japão", "MSCI Japan, em USD"), "MCHI": ("Ações da China", "MSCI China, em USD"),
    "INDA": ("Ações da Índia", "MSCI India, em USD"), "EWG": ("Ações da Alemanha", "MSCI Germany, em USD"),
    "EWU": ("Ações do Reino Unido", "MSCI UK, em USD"), "EWC": ("Ações do Canadá", "MSCI Canada, em USD"),
    "EWA": ("Ações da Austrália", "MSCI Australia, em USD"), "EWY": ("Ações da Coreia do Sul", "MSCI Korea, em USD"),
    "EWT": ("Ações de Taiwan", "MSCI Taiwan, em USD"), "EWW": ("Ações do México", "MSCI Mexico, em USD"),
    # classes de ativos
    "AOR": ("Carteira 60/40 global", "60% ações globais e 40% renda fixa (iShares)"),
    "VEU": ("Ações globais ex-EUA", "Todas as regiões menos os EUA"),
    "LQD": ("Crédito corporativo EUA (grau de investimento)", "Títulos de empresas com boa nota de crédito"),
    "GSG": ("Commodities (S&P GSCI)", "Cesta de futuros com peso em energia"),
    "VNQ": ("Imobiliário EUA (REITs)", "Fundos imobiliários americanos"),
    "UUP": ("Dólar americano (DXY)", "Dólar contra euro, iene, libra e outras"),
    "BTC-USD": ("Bitcoin", "Bitcoin em dólares"),
    # fatores
    "MTUM": ("Fator momentum (EUA)", "Ações que mais subiram nos últimos 6 a 12 meses"),
    "VLUE": ("Fator valor (EUA)", "Ações baratas em relação a lucros, vendas e patrimônio"),
    "IWF": ("Fator crescimento (EUA)", "Empresas de crescimento do Russell 1000"),
    "QUAL": ("Fator qualidade (EUA)", "Alta rentabilidade, lucros estáveis e pouca dívida"),
    "USMV": ("Fator mínima volatilidade (EUA)", "Carteira de ações menos voláteis"),
    "SCHD": ("Fator dividendos (EUA)", "Empresas com dividendos altos e consistentes"),
    # commodities
    "DBC": ("Commodities diversificadas", "Cesta de futuros de energia, metais e agrícolas"),
    "USO": ("Petróleo WTI", "Futuros de petróleo (custo de rolagem)"), "UNG": ("Gás natural", "Futuros de gás natural dos EUA"),
    "SLV": ("Prata", "ETF lastreado em prata física"), "CPER": ("Cobre", "Futuros de cobre"),
    "DBA": ("Agrícolas", "Cesta de futuros agrícolas"), "CORN": ("Milho", "Futuros de milho"),
    "WEAT": ("Trigo", "Futuros de trigo"), "PICK": ("Mineradoras globais", "Ações de mineração de metais"),
    # moedas
    "BRL": ("Real brasileiro", "Valor de 1 BRL em dólares"), "EUR": ("Euro", "Valor de 1 EUR em dólares"),
    "JPY": ("Iene japonês", "Valor de 1 JPY em dólares"), "GBP": ("Libra esterlina", "Valor de 1 GBP em dólares"),
    "MXN": ("Peso mexicano", "Valor de 1 MXN em dólares"), "CNY": ("Yuan chinês", "Valor de 1 CNY em dólares"),
    "AUD": ("Dólar australiano", "Valor de 1 AUD em dólares"), "CAD": ("Dólar canadense", "Valor de 1 CAD em dólares"),
    "CHF": ("Franco suíço", "Valor de 1 CHF em dólares"),
    "FXBASKET": ("Cesta sintética de moedas", "Média geométrica equal-weight dos valores em USD das moedas do modelo"),
}
for _t, _n in SPDR.items():
    NAMES[_t] = (f"Setor {_n.lower()} (EUA)", f"ETF SPDR do setor de {_n.lower()} do S&P 500")
for _t, _n in FIIS.items():
    NAMES[_t] = (f"FII {_n}", "Fundo imobiliário negociado na B3")
for _t, _n in BR_STOCKS.items():
    NAMES[_t] = (_n, "Ação brasileira" + (" (unit)" if _t.endswith("11") else ""))
for _t, _n in US_STOCKS.items():
    NAMES[_t] = (_n, "Ação americana")

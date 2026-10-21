# RRG · Gráfico de Rotação Relativa

App estático e interativo de **Relative Rotation Graph** com dados reais, publicado em
**https://celowiz.github.io/rrg/**. Projeto educativo do portfólio de [Marcelo Wizenberg](https://celowiz.github.io/), sem recomendação de investimento.

## Como funciona
- `scripts/fetch_data.py` baixa fechamentos diários (≈4 anos) e grava `data/prices.json` + `data/meta.json`.
- `scripts/summary.py` grava `data/summary.json` (~2 KB): quadrantes semanais dos setores B3 × Ibovespa com rastro de 5 semanas e os últimos fechamentos do S&P 500 e do dólar. É o que a página [Mercado Hoje](https://celowiz.github.io/mercado-hoje/) do portfólio lê.
  - **B3** (API pública de estatísticas de índices): Ibovespa, IFIX, IFNC, IMAT, ICON, IEEX, UTIL, IMOB, INDX, SMLL, IDIV.
  - **Yahoo Finance** (`yfinance`, fechamento ajustado): ações BR (units tratadas como ações), FIIs, ações e ETFs dos EUA, SPDR setoriais, índices EUA.
  - Fallbacks se a B3 falhar: IBOV→`^BVSP`, IFIX→`XFIX11.SA`, SMLL→`SMAL11.SA`, IDIV→`DIVO11.SA`. Índices setoriais sem fallback (não há ETF setorial BR líquido); séries ausentes ficam listadas em `meta.notes` e aparecem na página.
  - Benchmark dos modelos dos EUA: **SPY** (retorno total, compatível com preços ajustados das ações/ETFs). `^GSPC` também fica disponível no modo livre.
- O navegador calcula o RRG (`js/rrg.js`) a partir dos preços, por isso o modo livre aceita qualquer combinação do universo.
- Fórmulas (aproximação pública do método JdK) documentadas em `scripts/rrg.py`; `js/rrg.js` é uma porta fiel, verificada em `tests/rrg.test.mjs` contra a fixture gerada pelos testes Python.
- GitHub Actions (`.github/workflows/pages.yml`): testes → dados → Pages, em todo push, manualmente e de segunda a sexta às 19:07 (BRT), com um cron reserva às 21:07 que só refaz o build se o das 19:07 ainda não tiver publicado. Chamadas à B3 e ao Yahoo têm novas tentativas com espera crescente.

## Rodar localmente
```bash
pip install -r requirements.txt
python -m pytest -q tests && node tests/rrg.test.mjs
python scripts/fetch_data.py data
python scripts/summary.py data
python -m http.server 8000   # http://localhost:8000
```

## Analytics
GA4 `G-QCBFGR39WG`, `content_group: rrg`. Eventos: `preset_select`, `free_mode_add`, `benchmark_change`, `play_toggle`, `asset_highlight`, `control_change`, `share_link`, `png_export`, `outbound_click`.

## v2
- "O que mudou esta semana", painel de detalhe com séries de RS-Ratio/RS-Momentum e preço vs benchmark.
- Histórico desde 2018 (Covid incluso), seletor de data e "momentos históricos".
- Eixos com escala independente, link de compartilhamento com data/ativo/idioma, PT/EN, tour guiado (`?notour` desativa), imagem Open Graph (`og.png`).
- O script descarta o dia corrente antes de ~18:30 BRT para não publicar preços intradiários.
- Novos eventos GA4: `change_click`, `date_pick`, `moment_select`, `language_toggle`, `tour_start`, `tour_step`, `tour_dismiss`, `tour_complete`.

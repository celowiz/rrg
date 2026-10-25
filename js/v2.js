// RRG v2 (mock): i18n, "o que mudou", detalhe com séries, datas históricas, tour.
const I18N={
 pt:{q_L:'Liderança',q_W:'Enfraquecimento',q_G:'Defasagem',q_I:'Melhora',ax_x:'RS-RATIO (força relativa) →',ax_y:'RS-MOMENTUM (ritmo) →',src:'FONTE: B3 · YAHOO FINANCE',
  week_of:'SEMANA DE',day_of:'DIA',u_w:'sem.',u_d:'pregões',u_wl:'semanas',u_dl:'pregões',u_wh:'Sem.',u_dh:'Preg.',in_q:'no quadrante',free:'Modo livre',
  free_desc:'Monte sua própria cesta: busque por ticker ou nome (ex.: “ouro”, “Japão”, “momentum”, “Itaú”) e escolha um benchmark.',
  not_found:'"%s" não está no universo disponível',max15:'Máximo de 15 ativos',copied:'Link copiado (inclui data, ativo destacado e idioma)',png_ok:'PNG exportado',other_asset:'Outro ativo',
  ch_title_w:'O que mudou esta semana',ch_title_d:'O que mudou nos últimos 5 pregões',ch_none:'Nenhum ativo mudou de quadrante neste período.',ch_from:'vindo de',ch_entered:'entrou em',
  ch_hint:'Clique para destacar no gráfico.',det_hint:'Clique em um ativo no gráfico, na tabela ou em “O que mudou”.',det_ratio:'RS-RATIO AO LONGO DO TEMPO',det_mom:'RS-MOMENTUM AO LONGO DO TEMPO',
  det_px:'PREÇO DO ATIVO vs BENCHMARK (base 100)',det_bg:'Fundo colorido = quadrante em cada período.',st_q:'Quadrante',st_since:'Há',st_ret:'Retorno 52p',st_bret:'Benchmark 52p',st_head:'Rumo',st_dist:'Distância',
  det_note:'Leitura descritiva do passado, sem sinal de compra ou venda.',hist:'Momentos históricos',hist_hint:'Veja como estava a rotação em datas marcantes.',goto_date:'Ir para data',today:'Hoje',
  status:(d)=>`Dados até <b>${d}</b> · fontes: <a href="https://www.b3.com.br/pt_br/market-data-e-indices/indices/" target="_blank" rel="noopener">B3</a> (Ibovespa, IFIX e índices setoriais) e <a href="https://finance.yahoo.com/" target="_blank" rel="noopener">Yahoo Finance</a> (fechamento ajustado) · histórico desde 2018`,
  notes:'Observações sobre os dados',tour_next:'Próximo',tour_skip:'Pular',tour_done:'Começar',
  tour:[['#presets','Escolha um modelo','Cada modelo compara um grupo de ativos (setores, ações, FIIs, países, moedas…) contra um benchmark.'],
   ['#rrg','Leia a rotação','Eixo X: força relativa. Eixo Y: ritmo dessa força. Os ativos giram em sentido horário: Melhora → Liderança → Enfraquecimento → Defasagem.'],
   ['.timeline','Volte no tempo','Use o controle, o calendário ou os momentos históricos para ver o gráfico em qualquer data desde 2019.'],
   ['#changes','O que mudou','Aqui aparecem os ativos que trocaram de quadrante no último período. Clique para destacar.'],
   ['#tbl','Detalhe do ativo','Clique em um ativo para ver o histórico de RS-Ratio, RS-Momentum e preço contra o benchmark.']],
 },
 en:{q_L:'Leading',q_W:'Weakening',q_G:'Lagging',q_I:'Improving',ax_x:'RS-RATIO (relative strength) →',ax_y:'RS-MOMENTUM (pace) →',src:'SOURCE: B3 · YAHOO FINANCE',
  week_of:'WEEK OF',day_of:'DAY',u_w:'wks',u_d:'sessions',u_wl:'weeks',u_dl:'sessions',u_wh:'Wks',u_dh:'Sess.',in_q:'in quadrant',free:'Free mode',
  free_desc:'Build your own basket: search by ticker or name (e.g. “gold”, “Japan”, “momentum”, “Apple”) and pick a benchmark.',
  not_found:'"%s" is not in the available universe',max15:'Up to 15 assets',copied:'Link copied (includes date, highlighted asset and language)',png_ok:'PNG exported',other_asset:'Other asset',
  ch_title_w:'What changed this week',ch_title_d:'What changed in the last 5 sessions',ch_none:'No asset changed quadrant in this period.',ch_from:'from',ch_entered:'entered',
  ch_hint:'Click to highlight on the chart.',det_hint:'Click an asset on the chart, the table or “What changed”.',det_ratio:'RS-RATIO OVER TIME',det_mom:'RS-MOMENTUM OVER TIME',
  det_px:'ASSET PRICE vs BENCHMARK (base 100)',det_bg:'Colored background = quadrant in each period.',st_q:'Quadrant',st_since:'For',st_ret:'52p return',st_bret:'Benchmark 52p',st_head:'Heading',st_dist:'Distance',
  det_note:'Descriptive reading of the past, not a buy or sell signal.',hist:'Historical moments',hist_hint:'See the rotation on landmark dates.',goto_date:'Go to date',today:'Today',
  status:(d)=>`Data through <b>${d}</b> · sources: <a href="https://www.b3.com.br/pt_br/market-data-e-indices/indices/" target="_blank" rel="noopener">B3</a> (Ibovespa, IFIX and sector indices) and <a href="https://finance.yahoo.com/" target="_blank" rel="noopener">Yahoo Finance</a> (adjusted close) · history since 2018`,
  notes:'Data notes',tour_next:'Next',tour_skip:'Skip',tour_done:'Start',
  tour:[['#presets','Pick a model','Each model compares a group of assets (sectors, stocks, REITs, countries, currencies…) against a benchmark.'],
   ['#rrg','Read the rotation','X axis: relative strength. Y axis: its pace. Assets tend to rotate clockwise: Improving → Leading → Weakening → Lagging.'],
   ['.timeline','Go back in time','Use the slider, the calendar or the historical moments to see the chart on any date since 2019.'],
   ['#changes','What changed','Assets that switched quadrant in the last period show up here. Click to highlight.'],
   ['#tbl','Asset detail','Click an asset to see its RS-Ratio, RS-Momentum and price vs benchmark over time.']],
 }};
// textos estáticos (data-i18n)
const STATIC={
 pt:{eyebrow:'Projeto · Relative Rotation Graph',h1:'Quem está ganhando força<br>contra o mercado?',lead:'O RRG mostra, num só plano, a <em>força relativa</em> de cada ativo frente a um benchmark (eixo X) e o <em>ritmo</em> dessa força (eixo Y). Os ativos tendem a girar no sentido horário entre os quatro quadrantes. Ferramenta educativa, não é recomendação de investimento.',
  weekly:'Semanal',daily:'Diário',trail:'Rastro',smooth:'Suavização',replay:'↻ Redesenhar rastro',tbl:'Tabela de rotação',th_asset:'Ativo',th_q:'Quadrante',th_head:'Rumo',th_spd:'Vel.',th_dist:'Dist.',
  detail:'Detalhe',howto:'Como ler',how_L:'<b>Liderança</b>: força relativa alta e subindo.',how_W:'<b>Enfraquecimento</b>: ainda forte, mas perdendo ritmo.',how_G:'<b>Defasagem</b>: fraco e perdendo ritmo.',how_I:'<b>Melhora</b>: fraco, mas ganhando ritmo.',
  avg:'Neste conjunto, o tempo médio que um ativo ficou num mesmo quadrante foi de',assets15:'Ativos (até 15)',bench:'Benchmark',search:'Buscar por ticker ou nome… (ex.: PETR4, ouro, Japão)',
  method:'Como é calculado',m1:'<b>Força relativa.</b> Para cada data dividimos o preço do ativo pelo do benchmark. Se a linha sobe, o ativo está indo melhor que a referência.',m2:'<b>RS-Ratio (eixo X).</b> Compara essa força relativa com a sua própria média móvel e normaliza o resultado em torno de 100. Acima de 100, a força relativa está acima da tendência recente.',m3:'<b>RS-Momentum (eixo Y).</b> Mede a velocidade de variação do RS-Ratio, também normalizada em torno de 100. Acima de 100, a força relativa está acelerando.',m4:'<b>Limites.</b> O RRG descreve o passado e não prevê preços. Rotações podem parar ou inverter a qualquer momento. Usamos uma aproximação pública do método de Julius de Kempenaer, não a fórmula proprietária.',
  footer:'Conteúdo educativo. Não constitui recomendação de investimento. Dados com possíveis atrasos ou falhas das fontes. RRG® é marca registrada da RRG Research; esta é uma implementação independente.',back:'← Voltar ao portfólio',portfolio:'Portfólio',tourbtn:'Tour'},
 en:{eyebrow:'Project · Relative Rotation Graph',h1:'Who is gaining strength<br>against the market?',lead:'The RRG shows, on a single plane, each asset’s <em>relative strength</em> versus a benchmark (X axis) and the <em>pace</em> of that strength (Y axis). Assets tend to rotate clockwise through the four quadrants. Educational tool, not investment advice.',
  weekly:'Weekly',daily:'Daily',trail:'Trail',smooth:'Smoothing',replay:'↻ Redraw trail',tbl:'Rotation table',th_asset:'Asset',th_q:'Quadrant',th_head:'Heading',th_spd:'Speed',th_dist:'Dist.',
  detail:'Detail',howto:'How to read',how_L:'<b>Leading</b>: strong and rising relative strength.',how_W:'<b>Weakening</b>: still strong, but losing pace.',how_G:'<b>Lagging</b>: weak and losing pace.',how_I:'<b>Improving</b>: weak, but gaining pace.',
  avg:'In this set, the average time an asset stayed in the same quadrant was',assets15:'Assets (up to 15)',bench:'Benchmark',search:'Search by ticker or name… (e.g. AAPL, gold, Japan)',
  method:'How it is computed',m1:'<b>Relative strength.</b> For each date we divide the asset price by the benchmark price. If the line rises, the asset is beating the benchmark.',m2:'<b>RS-Ratio (X axis).</b> Compares that relative strength with its own moving average and normalizes it around 100. Above 100, relative strength is above its recent trend.',m3:'<b>RS-Momentum (Y axis).</b> Measures the rate of change of the RS-Ratio, also normalized around 100. Above 100, relative strength is accelerating.',m4:'<b>Limits.</b> The RRG describes the past and does not forecast prices. Rotations can stall or reverse at any time. We use a public approximation of Julius de Kempenaer’s method, not the proprietary formula.',
  footer:'Educational content. Not investment advice. Data may be delayed or contain source errors. RRG® is a registered trademark of RRG Research; this is an independent implementation.',back:'← Back to portfolio',portfolio:'Portfolio',tourbtn:'Tour'}};
const tr=k=>(I18N[st.lang]||I18N.pt)[k]??I18N.pt[k]??k;
function applyLang(){document.documentElement.lang=st.lang=='en'?'en':'pt-BR';
 document.querySelectorAll('[data-i18n]').forEach(e=>{const v=STATIC[st.lang][e.dataset.i18n];if(v!=null)e.innerHTML=v});
 document.querySelectorAll('[data-i18n-ph]').forEach(e=>e.placeholder=STATIC[st.lang][e.dataset.i18nPh]);
 document.querySelectorAll('#lang button').forEach(b=>b.classList.toggle('on',b.dataset.l==st.lang));
 $('#histT').textContent=tr('hist');$('#gotoL').textContent=tr('goto_date');
 statusLine();if(META)fillLists(Object.entries(META.info).sort((a,b)=>a[1].group.localeCompare(b[1].group)||a[0].localeCompare(b[0])))}
function statusLine(){if(!META)return;$('#status').innerHTML=tr('status')(fmt(META.last_date))+(META.notes.length?`<details><summary>${tr('notes')} (${META.notes.length})</summary><ul>${META.notes.map(n=>`<li>${n}</li>`).join('')}</ul></details>`:'')}
function fillLists(uni){const G=st.lang=='en'?{idx_br:'B3 indices',br:'Brazil stocks',fii:'REITs (FIIs)',us:'US stocks',sector_us:'US sectors',etf:'ETFs',idx_us:'US indices',country:'Countries',asset:'Asset classes',factor:'US factors',commod:'Commodities',fx:'Currencies'}:GROUPS;
 $('#tickers').innerHTML=uni.map(([t,i])=>`<option value="${t}" label="${t} · ${name(t)} — ${G[i.group]||''}">${t} ${i.name} ${i.name_en||''}</option>`).join('');
 const bo=window.BOPTS||[];$('#freeBench').innerHTML=bo.map(t=>`<option value="${t}">${t} · ${name(t)}</option>`).join('')+`<optgroup label="${tr('other_asset')}">${uni.filter(([t])=>!bo.includes(t)).map(([t])=>`<option value="${t}">${t} · ${name(t)}</option>`).join('')}</optgroup>`;$('#freeBench').value=st.freeB}

// ---------- 1) O que mudou
function changes(){const el=$('#changes');if(!el||!data.length)return;const back=st.tf=='w'?1:5,i=st.end,j=i-back;
 $('#chT').textContent=tr(st.tf=='w'?'ch_title_w':'ch_title_d');$('#chDate').textContent=j>=0?`${dateOf(j)} → ${dateOf(i)}`:'';
 const order={L:0,I:1,W:2,G:3},items=[];
 data.forEach(d=>{if(j<d.first||i<d.first)return;const a=quad(d.x[j],d.y[j]),b=quad(d.x[i],d.y[i]);if(a!=b)items.push({d,a,b})});
 items.sort((p,q)=>order[p.b]-order[q.b]);
 $('#chList').innerHTML=items.length?items.map(({d,a,b})=>`<button class="chg ${st.sel==d.t?'sel':''}" data-t="${d.t}"><i style="background:${QC[b]}"></i><span><b style="color:${d.c}">${d.t}</b> <span class="nm2">${name(d.t)}</span><br><span class="mv">${tr('ch_entered')} <b style="color:${QC[b]}">${Q[b].n}</b> · ${tr('ch_from')} ${Q[a].n}</span></span></button>`).join(''):`<p class="note">${tr('ch_none')}</p>`;
 document.querySelectorAll('#chList .chg').forEach(b=>b.onclick=()=>{ga('change_click',{asset:b.dataset.t,preset:st.free?'free':st.p.id});select(b.dataset.t,true);document.getElementById('detail').scrollIntoView({behavior:RM?'auto':'smooth',block:'nearest'})});
 $('#chHint').textContent=items.length?tr('ch_hint'):''}

// ---------- 2) Detalhe com séries
function lineChart(el,series,opts){const W=320,H=opts.h||96,P=4,all=series.flatMap(s=>s.v).filter(v=>v!=null);let mn=Math.min(...all,opts.base??Infinity),mx=Math.max(...all,opts.base??-Infinity);if(mx-mn<1e-9){mx+=1;mn-=1}
 const n=series[0].v.length,X=k=>P+k/(n-1)*(W-2*P),Y=v=>H-P-(v-mn)/(mx-mn)*(H-2*P);let h='';
 if(opts.bands){const w=(W-2*P)/(n-1);opts.bands.forEach((q,k)=>{h+=`<rect x="${X(k)-w/2}" y="0" width="${w+.5}" height="${H}" fill="${QC[q]}" opacity=".16"/>`})}
 if(opts.base!=null)h+=`<line x1="0" x2="${W}" y1="${Y(opts.base)}" y2="${Y(opts.base)}" stroke="#52525b" stroke-dasharray="3 3"/><text x="${W-2}" y="${Y(opts.base)-3}" text-anchor="end" fill="#8a8a93" font-size="8" font-family="ui-monospace,monospace">${opts.base}</text>`;
 series.forEach(s=>{h+=`<path d="${s.v.map((v,k)=>(k?'L':'M')+X(k).toFixed(1)+','+Y(v).toFixed(1)).join('')}" fill="none" stroke="${s.c}" stroke-width="${s.w||1.8}" ${s.dash?'stroke-dasharray="4 3"':''}/>`;h+=`<circle cx="${X(n-1)}" cy="${Y(s.v[n-1])}" r="2.6" fill="${s.c}"/>`});
 h+=`<text x="2" y="9" fill="#8a8a93" font-size="8" font-family="ui-monospace,monospace">${dateOf(opts.i0)}</text><text x="${W-2}" y="${H-3}" text-anchor="end" fill="#8a8a93" font-size="8" font-family="ui-monospace,monospace">${dateOf(opts.i1)}</text>`;
 el.setAttribute('viewBox',`0 0 ${W} ${H}`);el.innerHTML=h}
function detail(){if(!st.sel||!data.find(x=>x.t==st.sel)){$('#detailBody').hidden=true;$('#detailHint').hidden=false;$('#detailHint').textContent=tr('det_hint');return}
 const d=data.find(x=>x.t==st.sel),s=stats(d),i1=st.end,i0=Math.max(d.first,i1-52),sl=a=>a.slice(i0,i1+1);$('#detailBody').hidden=false;$('#detailHint').hidden=true;
 const bands=sl(d.x).map((x,k)=>quad(x,d.y[i0+k]));
 $('#dName').innerHTML=`<span style="color:${d.c}">${d.t}</span><div class="dn">${name(d.t)}</div><div class="ill">${desc(d.t)} · vs ${bench()} · ${name(bench())}</div>`;
 lineChart($('#dRatio'),[{v:sl(d.x),c:d.c}],{base:100,bands,i0,i1});lineChart($('#dMom'),[{v:sl(d.y),c:d.c}],{base:100,bands,i0,i1});
 const bp=sl(d.price.map((p,k)=>p/d.rs[k]*100)),ap=sl(d.price),na=ap.map(v=>v/ap[0]*100),nb=bp.map(v=>v/bp[0]*100);
 lineChart($('#dPx'),[{v:nb,c:'#a1a1aa',dash:1,w:1.4},{v:na,c:d.c}],{base:100,i0,i1});
 $('#dPxLeg').innerHTML=`<span><i style="background:${d.c}"></i>${d.t}</span><span><i class="dash"></i>${bench()}</span>`;
 const pct=v=>(v>=0?'+':'')+v.toFixed(1)+'%',u=s.w==1?(st.lang=='en'?(st.tf=='w'?'week':'session'):(st.tf=='w'?'semana':'pregão')):tr(st.tf=='w'?'u_wl':'u_dl');
 $('#dStats').innerHTML=[[tr('st_q'),`<b style="color:${QC[s.q]}">${Q[s.q].n}</b>`],[tr('st_since'),`${s.w} ${u}`],['RS-Ratio',d.x[i1].toFixed(2)],['RS-Momentum',d.y[i1].toFixed(2)],
  [tr('st_ret'),pct(na[na.length-1]-100)],[tr('st_bret'),pct(nb[nb.length-1]-100)],[tr('st_head'),`${s.ang.toFixed(0)}°`],[tr('st_dist'),s.dist.toFixed(2)]].map(([k,v])=>`<div><span>${k}</span>${v}</div>`).join('');
 document.querySelectorAll('[data-dl]').forEach(e=>e.textContent=tr(e.dataset.dl));$('#dNote').textContent=`${tr('det_bg')} ${tr('det_note')}`}

// ---------- 3) Datas históricas
const MOMENTS=[
 {d:'2020-03-23',pt:['Covid: fundo do mercado','Pânico global com a pandemia; bolsas no fundo após quedas de 30% a 45% em poucas semanas.'],en:['Covid: market bottom','Global pandemic panic; stock markets bottomed after 30–45% drops in weeks.'],p:'*'},
 {d:'2020-11-09',pt:['Anúncio da vacina','Resultado da vacina da Pfizer dispara rotação para valor, small caps e setores cíclicos.'],en:['Vaccine announcement','Pfizer vaccine results trigger a rotation into value, small caps and cyclicals.'],p:'setus,fatores,spx,paises,classes,setbr,acbr'},
 {d:'2022-03-08',pt:['Guerra na Ucrânia','Petróleo e commodities no pico após a invasão da Ucrânia; exportadores ganham força.'],en:['War in Ukraine','Oil and commodities peak after the invasion of Ukraine; exporters gain strength.'],p:'commod,classes,moedas,paises,setbr,acbr,setus'},
 {d:'2022-06-16',pt:['Fed sobe 0,75 p.p.','Maior alta de juros nos EUA desde 1994; mínima do bear market de 2022 nos EUA.'],en:['Fed hikes 75 bp','Largest US rate hike since 1994; the 2022 US bear market low.'],p:'setus,spx,fatores,classes,paises,commod'},
 {d:'2022-10-28',pt:['Eleição presidencial no Brasil','Semana do 2º turno; forte volatilidade em estatais, bancos e no real.'],en:['Brazil presidential election','Runoff week; strong volatility in state-owned firms, banks and the real.'],p:'setbr,acbr,fii,moedas'},
 {d:'2023-03-13',pt:['Quebra do SVB','Crise de bancos regionais nos EUA; financeiro perde força relativa.'],en:['SVB collapse','US regional bank crisis; financials lose relative strength.'],p:'setus,spx,fatores,classes'},
 {d:'2024-08-05',pt:['Desmonte do carry trade de iene','Iene dispara e bolsas caem com o fim de posições alavancadas.'],en:['Yen carry-trade unwind','The yen jumps and stocks fall as leveraged positions are unwound.'],p:'moedas,paises,fatores,setus,classes'},
 {d:'2024-12-18',pt:['Estresse fiscal no Brasil','Dólar acima de R$ 6,20 e juros longos em alta; pressão em setores domésticos e FIIs.'],en:['Brazil fiscal stress','USD above BRL 6.20 and long rates up; pressure on domestic sectors and REITs.'],p:'setbr,acbr,fii,moedas'},
 {d:'2025-04-08',pt:['Tarifas dos EUA','Bolsas no fundo após o anúncio de tarifas amplas pelos EUA, antes da pausa de 90 dias.'],en:['US tariffs','Markets bottom after sweeping US tariffs, right before the 90-day pause.'],p:'*'},
];
function idxForDate(s){let k=0;for(let i=0;i<DT.length;i++){if(DT[i]<=s)k=i;else break}return k}
function moments(){const id=st.free?'free':st.p.id,lo=DT[Math.max(0,st.minEnd)],hi=DT[N-1];
 const ms=MOMENTS.filter(m=>(m.p=='*'||st.free||m.p.split(',').includes(id))&&m.d>=lo&&m.d<=hi);
 $('#moments').innerHTML=ms.map(m=>`<button class="mchip" data-d="${m.d}" title="${m[st.lang][1]}">${m[st.lang][0]} <span>${fmt(m.d).slice(3)}</span></button>`).join('')+`<button class="mchip now" data-d="${hi}">${tr('today')}</button>`;
 document.querySelectorAll('#moments .mchip').forEach(b=>b.onclick=()=>{play(false);const m=MOMENTS.find(x=>x.d==b.dataset.d);goDate(b.dataset.d,m);ga('moment_select',{moment:b.dataset.d,preset:id})});
 $('#mcap').hidden=true}
function goDate(s,m){st.end=Math.max(st.minEnd,idxForDate(s));st.T=st.end;$('#time').value=st.end;render();grow();writeHash();
 document.querySelectorAll('#moments .mchip').forEach(b=>b.classList.toggle('on',b.dataset.d==s));
 const c=$('#mcap');if(m){c.hidden=false;c.innerHTML=`<b>${m[st.lang][0]} · ${fmt(m.d)}</b> ${m[st.lang][1]}`}else c.hidden=true}
function syncDate(){const el=$('#dateIn');if(!el||!DT.length)return;el.min=DT[st.minEnd];el.max=DT[N-1];el.value=DT[st.end]}

// ---------- 7) tour + idioma
let tourI=0;
function maybeTour(){if(localStorage.getItem('rrg_tour_v2')||/[?&]notour/.test(location.search))return;setTimeout(()=>tour(0),RM?0:1400)}
function tour(i){tourI=i;const steps=tr('tour'),ov=$('#tour');document.querySelectorAll('.tour-hl').forEach(e=>e.classList.remove('tour-hl'));
 if(i>=steps.length){ov.hidden=true;localStorage.setItem('rrg_tour_v2','1');ga('tour_complete');return}
 const [sel,t,b]=steps[i],tg=$(sel);tg.classList.add('tour-hl');tg.scrollIntoView({block:'center',behavior:RM?'auto':'smooth'});ov.hidden=false;
 $('#tourBox').innerHTML=`<div class="ill">${i+1} / ${steps.length}</div><h3>${t}</h3><p>${b}</p><div class="tb"><button class="btn sm" id="tSkip">${tr('tour_skip')}</button><button class="btn sm pri" id="tNext">${i==steps.length-1?tr('tour_done'):tr('tour_next')}</button></div>`;
 $('#tSkip').onclick=()=>{ov.hidden=true;document.querySelectorAll('.tour-hl').forEach(e=>e.classList.remove('tour-hl'));localStorage.setItem('rrg_tour_v2','1');ga('tour_dismiss',{step:i+1})};
 $('#tNext').onclick=()=>{ga('tour_step',{step:i+1});tour(i+1)}}
function bindV2(){
 document.querySelectorAll('#lang button').forEach(b=>b.onclick=()=>{if(st.lang==b.dataset.l)return;st.lang=b.dataset.l;ga('language_toggle',{lang:st.lang});applyLang();presets();freeUI();
  $('#presetName').textContent=st.free?tr('free'):pname(st.p);$('#presetDesc').innerHTML=st.free?tr('free_desc'):pdesc(st.p);$('#benchName').textContent='BENCHMARK: '+bench()+' · '+name(bench()).toUpperCase();
  $('#unitH').textContent=tr(st.tf=='w'?'u_wh':'u_dh');moments();legend();render();writeHash()});
 $('#dateIn').onchange=e=>{if(!e.target.value)return;play(false);goDate(e.target.value);ga('date_pick',{date:e.target.value,preset:st.free?'free':st.p.id})};
 $('#tourBtn').onclick=()=>{ga('tour_start');tour(0)};}
// legend names in current language
legend=function(){$('#legend').innerHTML=data.map(d=>`<button data-t="${d.t}" class="${st.hidden.has(d.t)?'off':''}" title="${desc(d.t)}"><i style="background:${d.c}"></i>${d.t}<span class="nm">${name(d.t)}</span></button>`).join('');
 document.querySelectorAll('#legend button').forEach(b=>b.onclick=()=>{const t=b.dataset.t;ga('control_change',{control:'legend_toggle',value:t});st.hidden.has(t)?st.hidden.delete(t):st.hidden.add(t);if(st.sel==t)st.sel=null;legend();render()})};
boot();

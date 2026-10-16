// RRG — Rotação Relativa. Dados reais (B3 + Yahoo Finance), calculados no navegador com js/rrg.js.
const $=s=>document.querySelector(s);
const PAL=['#2dd4bf','#f472b6','#facc15','#60a5fa','#a78bfa','#fb923c','#4ade80','#f87171','#e879f9','#38bdf8','#fde047','#94a3b8'];
const Q={L:{n:'Liderança',c:'#2dd4bf'},W:{n:'Enfraquecimento',c:'#facc15'},G:{n:'Defasagem',c:'#f87171'},I:{n:'Melhora',c:'#60a5fa'}};
const GROUPS={idx_br:'Índices B3',br:'Ações Brasil',fii:'FIIs',us:'Ações EUA',sector_us:'Setores EUA (SPDR)',etf:'ETFs',idx_us:'Índices EUA',country:'Países',asset:'Classes de ativos',factor:'Fatores EUA',commod:'Commodities',fx:'Moedas'};
let D=null,META=null,PRESETS=[],N=156,DT=[],WE=[],DI=[];
const st={p:null,tf:'w',trail:10,smooth:10,end:0,T:0,prog:0,fade:1,e:null,minEnd:0,hidden:new Set(),sel:null,playing:false,free:false,freeA:['PETR4','VALE3','WEGE3','ITUB4'],freeB:'IBOV'};
const ga=(ev,p={})=>{try{window.gtag&&gtag('event',ev,{content_group:'rrg',...p})}catch(e){}};
const name=t=>(META.info[t]||{}).name||t,desc=t=>(META.info[t]||{}).desc||'';
const bench=()=>st.free?st.freeB:st.p.bench;
function compute(t){const idx=st.tf=='w'?WE:DI,a=D.series[t],b=D.series[bench()],p=idx.map(i=>a[i]),bb=idx.map(i=>b[i]),r=RRG.rrg(p,bb,st.smooth),off=idx.length-N;
 const o={t,price:p.slice(off),rs:r.rs.slice(off),x:r.x.slice(off),y:r.y.slice(off)};
 let f=o.x.findIndex((v,i)=>v!=null&&o.y[i]!=null);if(f<0)f=N-1;o.first=f;
 for(const k of ['x','y','price','rs'])for(let i=0;i<N;i++)if(o[k][i]==null)o[k][i]=i?o[k][i-1]:(o[k].find(v=>v!=null)??100);
 return o}
const quad=RRG.quadrant;
const fmt=s=>s?s.slice(8,10)+'/'+s.slice(5,7)+'/'+s.slice(0,4):'';function dateOf(i){return fmt(DT[Math.max(0,Math.min(N-1,i))])}

let data=[];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease=t=>t<.5?4*t*t*t:1-(-2*t+2)**3/2;
function cr(d,u){u=Math.max(0,Math.min(N-1,u));const i=Math.min(N-2,Math.floor(u)),t=u-i,ix=k=>Math.max(0,Math.min(N-1,k));
 const f=a=>{const p0=a[ix(i-1)]??a[i],p1=a[i],p2=a[ix(i+1)],p3=a[ix(i+2)]??p2,t2=t*t,t3=t2*t;
  return .5*(2*p1+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t2+(-p0+3*p1-3*p2+p3)*t3)};return[f(d.x),f(d.y)]}
function assets(){return (st.free?st.freeA:st.p.assets).filter(t=>D.series[t]&&t!==bench())}
function rebuild(){data=assets().map((t,i)=>({...compute(t),c:PAL[i%PAL.length]}))}

// ---------- chart
const W=720,H=620,m={l:52,r:18,t:16,b:44};
const svg=$('#rrg');
function domain(){let ext=3;data.forEach(d=>{if(st.hidden.has(d.t))return;for(let i=Math.max(0,Math.floor(st.T-st.trail));i<=Math.min(N-1,Math.ceil(st.T));i++){ext=Math.max(ext,Math.abs(d.x[i]-100),Math.abs(d.y[i]-100))}});return ext*1.12}
function draw(){
 const tgt=domain();st.e=st.e==null||RM?tgt:st.e+(tgt-st.e)*.12;const e=st.e,sx=v=>m.l+(v-100+e)/(2*e)*(W-m.l-m.r),sy=v=>H-m.b-(v-100+e)/(2*e)*(H-m.t-m.b),cx=sx(100),cy=sy(100);
 let h='';
 const qr=[['I',m.l,m.t,cx-m.l,cy-m.t],['L',cx,m.t,W-m.r-cx,cy-m.t],['G',m.l,cy,cx-m.l,H-m.b-cy],['W',cx,cy,W-m.r-cx,H-m.b-cy]];
 h+=`<rect x="0" y="0" width="${W}" height="${H}" fill="#08080a"/>`;
 qr.forEach(([k,x,y,w,hh])=>{h+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="${Q[k].c}" opacity=".06"/>`});
 const lab=(k,x,y,a)=>`<text x="${x}" y="${y}" text-anchor="${a}" fill="${Q[k].c}" font-family="ui-monospace,monospace" font-size="12" letter-spacing="1.5" opacity=".85">${Q[k].n.toUpperCase()}</text>`;
 h+=lab('I',m.l+10,m.t+20,'start')+lab('L',W-m.r-10,m.t+20,'end')+lab('G',m.l+10,H-m.b-12,'start')+lab('W',W-m.r-10,H-m.b-12,'end');
 const step=e>11?4:e>6?2:1;
 for(let v=Math.ceil(100-e+.3);v<=100+e;v+=1){if(v%step)continue;h+=`<line x1="${sx(v)}" x2="${sx(v)}" y1="${m.t}" y2="${H-m.b}" stroke="#1c1c1f"/><line y1="${sy(v)}" y2="${sy(v)}" x1="${m.l}" x2="${W-m.r}" stroke="#1c1c1f"/>
 <text x="${sx(v)}" y="${H-m.b+16}" fill="#71717a" font-size="10" text-anchor="middle" font-family="ui-monospace,monospace">${v}</text><text x="${m.l-8}" y="${sy(v)+3}" fill="#71717a" font-size="10" text-anchor="end" font-family="ui-monospace,monospace">${v}</text>`}
 h+=`<line x1="${cx}" x2="${cx}" y1="${m.t}" y2="${H-m.b}" stroke="#3f3f46"/><line y1="${cy}" y2="${cy}" x1="${m.l}" x2="${W-m.r}" stroke="#3f3f46"/>
 <text x="${(W+m.l)/2}" y="${H-8}" fill="#a1a1aa" font-size="11" text-anchor="middle" font-family="ui-monospace,monospace" letter-spacing="1">RS-RATIO (força relativa) →</text>
 <text transform="translate(14 ${(H-m.b)/2}) rotate(-90)" fill="#a1a1aa" font-size="11" text-anchor="middle" font-family="ui-monospace,monospace" letter-spacing="1">RS-MOMENTUM (ritmo) →</text>
 <text x="${W-m.r-6}" y="${H-m.b-30}" text-anchor="end" fill="#52525b" font-size="10" font-family="ui-monospace,monospace">FONTE: B3 · YAHOO FINANCE · ${dateOf(st.end)}</text>`;
 const n=st.trail,T=st.T,start=T-n,head=start+Math.min(n,st.prog),SPS=10;
 data.forEach(d=>{if(st.hidden.has(d.t))return;const dim=st.sel&&st.sel!==d.t,g=(dim?.15:1)*st.fade;if(g<=0)return;
  const P=u=>{const p=cr(d,u);return[sx(p[0]),sy(p[1])]};
  // trail as one path per week-chunk, opacity fading smoothly with age
  for(let k=Math.floor(start);k<head;k++){const u0=Math.max(start,k),u1=Math.min(head,k+1);if(u1<=u0)continue;
   let dpath='';for(let j=0;j<=SPS;j++){const q=P(u0+(u1-u0)*j/SPS);dpath+=(j?'L':'M')+q[0].toFixed(1)+','+q[1].toFixed(1)}
   const age=(T-(u0+u1)/2)/n,op=Math.max(0,(1-age))**1.4*g*.95+.04*g;
   h+=`<path d="${dpath}" fill="none" stroke="${d.c}" stroke-width="${st.sel==d.t?3.2:2.2}" stroke-linecap="round" opacity="${op.toFixed(3)}"/>`}
  for(let k=Math.ceil(start);k<head;k++){const q=P(k),age=(T-k)/n;h+=`<circle cx="${q[0]}" cy="${q[1]}" r="2" fill="${d.c}" opacity="${(Math.max(0,1-age)**1.4*g*.8).toFixed(3)}"/>`}
  if(head>start){const p=P(head),pb=P(head-.06),an=Math.atan2(p[1]-pb[1],p[0]-pb[0]);
   const ax=p[0]-Math.cos(an)*9,ay=p[1]-Math.sin(an)*9,tri=[[p[0]+Math.cos(an)*3,p[1]+Math.sin(an)*3],[ax+Math.cos(an+1.57)*5,ay+Math.sin(an+1.57)*5],[ax-Math.cos(an+1.57)*5,ay-Math.sin(an+1.57)*5]];
   const r=st.sel==d.t?8:6;
   h+=`<g class="hd" data-t="${d.t}" style="cursor:pointer" opacity="${g}"><path d="M${tri.map(t=>t.join(',')).join('L')}Z" fill="${d.c}" transform="translate(${Math.cos(an)*(r+7)} ${Math.sin(an)*(r+7)})"/><circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${d.c}" stroke="#050506" stroke-width="2"/><text x="${p[0]+10}" y="${p[1]-9}" fill="${d.c}" font-size="11.5" font-weight="600" font-family="ui-monospace,monospace">${d.t}</text><circle cx="${p[0]}" cy="${p[1]}" r="14" fill="transparent"/></g>`}
 });
 svg.innerHTML=h;
 svg.querySelectorAll('.hd').forEach(g=>{g.onmousemove=ev=>tip(ev,g.dataset.t);g.onmouseleave=()=>$('#tip').hidden=true;g.onclick=()=>select(g.dataset.t)});
 $('#dateLbl').textContent=`${st.tf=='w'?'SEMANA':'DIA'} DE ${dateOf(st.end)}`;
 $('#timeLbl').textContent=dateOf(Math.round(st.T));
}
function stats(d){const i=st.end,q=quad(d.x[i],d.y[i]);let w=0;while(i-w>=0&&d.x[i-w]!=null&&quad(d.x[i-w],d.y[i-w])==q)w++;
 const dx=d.x[i]-d.x[i-1],dy=d.y[i]-d.y[i-1];return{q,w,ang:(Math.atan2(dy,dx)*180/Math.PI+360)%360,spd:Math.hypot(dx,dy),dist:Math.hypot(d.x[i]-100,d.y[i]-100)}}
function tip(ev,t){const d=data.find(x=>x.t==t),s=stats(d),r=$('.chartcard').getBoundingClientRect(),el=$('#tip');
 el.innerHTML=`<b style="color:${d.c}">${t} · ${name(t)}</b><br><span style="color:#71717a">${desc(t)}</span><br>${Q[s.q].n}<br>RS-Ratio ${d.x[st.end].toFixed(2)}<br>RS-Mom. ${d.y[st.end].toFixed(2)}<br>${s.w} ${st.tf=='w'?'sem.':'dias'} no quadrante`;
 el.hidden=false;el.style.left=(ev.clientX-r.left+14)+'px';el.style.top=(ev.clientY-r.top+14)+'px'}
function table(){const u=st.tf=='w'?'':'d';
 $('#tbl tbody').innerHTML=data.filter(d=>!st.hidden.has(d.t)).map(d=>[d,stats(d)]).sort((a,b)=>b[1].dist-a[1].dist).map(([d,s])=>`<tr data-t="${d.t}" class="${st.sel==d.t?'sel':''}"><td><span style="color:${d.c}">${d.t}</span><div class="nm">${name(d.t)}</div></td><td><span class="q"><i style="background:${Q[s.q].c}"></i>${Q[s.q].n}</span></td><td>${s.w}${u}</td><td><span class="arrow" style="transform:rotate(${-s.ang}deg)">➜</span> ${s.ang.toFixed(0)}°</td><td>${s.spd.toFixed(2)}</td><td>${s.dist.toFixed(2)}</td></tr>`).join('');
 document.querySelectorAll('#tbl tbody tr').forEach(r=>r.onclick=()=>select(r.dataset.t));
 // tempo médio em quadrante
 let runs=[];data.forEach(d=>{let q=null,c=0;for(let i=d.first;i<=st.end;i++){const k=quad(d.x[i],d.y[i]);if(k==q)c++;else{if(c)runs.push(c);q=k;c=1}}});
 $('#avgQ').textContent=runs.length?(runs.reduce((a,b)=>a+b,0)/runs.length).toFixed(1)+(st.tf=='w'?' semanas':' sessões'):'—'}
function legend(){$('#legend').innerHTML=data.map(d=>`<button data-t="${d.t}" class="${st.hidden.has(d.t)?'off':''}"><i style="background:${d.c}"></i>${d.t}<span class="nm">${name(d.t)}</span></button>`).join('');
 document.querySelectorAll('#legend button').forEach(b=>b.onclick=()=>{const t=b.dataset.t;ga('control_change',{control:'legend_toggle',value:t});st.hidden.has(t)?st.hidden.delete(t):st.hidden.add(t);if(st.sel==t)st.sel=null;legend();render()})}
function spark(el,arr,c,base){const a=arr.slice(Math.max(0,st.end-52),st.end+1),mn=Math.min(...a),mx=Math.max(...a),X=i=>i/(a.length-1)*316+2,Y=v=>86-(v-mn)/(mx-mn||1)*80;
 el.innerHTML=`<line x1="0" x2="320" y1="${Y(base)}" y2="${Y(base)}" stroke="#3f3f46" stroke-dasharray="3 3"/><path d="${a.map((v,i)=>(i?'L':'M')+X(i)+','+Y(v)).join('')}" fill="none" stroke="${c}" stroke-width="1.8"/><circle cx="${X(a.length-1)}" cy="${Y(a[a.length-1])}" r="3" fill="${c}"/>`}
function detail(){if(!st.sel){$('#detailBody').hidden=true;$('#detailHint').hidden=false;return}
 const d=data.find(x=>x.t==st.sel),s=stats(d);$('#detailBody').hidden=false;$('#detailHint').hidden=true;
 $('#dName').innerHTML=`<span style="color:${d.c}">${d.t}</span> <div class="dn">${name(d.t)}</div><div class="ill">${desc(d.t)} · vs ${name(bench())}</div>`;
 const k=d.price[Math.max(0,st.end-52)];spark($('#dPrice'),d.price.map(v=>v/k*100),'#f4f1ea',100);const r0=d.rs[Math.max(0,st.end-52)];spark($('#dRs'),d.rs.map(v=>v/r0*100),d.c,100);
 $('#dNote').innerHTML=`Últimas 52 ${st.tf=='w'?'semanas':'sessões'}. Está em <b style="color:${Q[s.q].c}">${Q[s.q].n}</b> há ${s.w} ${st.tf=='w'?'semanas':'sessões'}, movendo-se a ${s.ang.toFixed(0)}°. Leitura descritiva, sem sinal de compra ou venda.`}
function select(t){st.sel=st.sel==t?null:t;if(st.sel)ga('asset_highlight',{asset:t,preset:st.free?'free':st.p.id});render()}
function render(){draw();table();detail()}

// ---------- animação contínua (rAF)
let job=null,loop=null;
function tick(now){let busy=false;
 if(job){const k=Math.min(1,(now-job.t0)/job.ms);job.step(ease(k),k);if(k>=1){const j=job;job=null;j.done&&j.done();if(job)busy=true}else busy=true}
 draw();if(Math.abs(st.e-domain())>.01)busy=true;
 loop=busy||st.playing?requestAnimationFrame(tick):null}
function kick(){if(!loop)loop=requestAnimationFrame(tick)}
function anim(ms,step,done){if(RM){step(1,1);job=null;done&&done();render();return}job={t0:performance.now(),ms,step,done};kick()}
function grow(){st.prog=0;st.fade=1;anim(500+st.trail*85,e=>st.prog=e*st.trail,()=>render())}
function play(on){st.playing=on;$('#play').textContent=on?'❚❚':'▶';if(!on){job=null;return}
 if(st.end>=N-1){st.end=st.minEnd;st.T=st.end;$('#time').value=st.end}st.prog=st.trail;
 const next=()=>{if(!st.playing)return;if(st.end>=N-1){play(false);render();return}const a=st.end;
  anim(st.tf=='w'?700:320,e=>{st.T=a+e},()=>{st.end=a+1;st.T=st.end;$('#time').value=st.end;table();detail();next()})};next()}
function crossfade(fn){if(RM){fn();return}anim(180,e=>st.fade=1-e,()=>{fn();})}
// ---------- UI
function presets(){$('#presets').innerHTML=PRESETS.map(p=>`<button class="chip ${!st.free&&st.p==p?'on':''}" data-id="${p.id}">${p.name}</button>`).join('')+`<button class="chip free-c ${st.free?'on':''}" data-id="free">＋ Modo livre</button>`;
 document.querySelectorAll('#presets .chip').forEach(b=>b.onclick=()=>{play(false);ga('preset_select',{preset:b.dataset.id});crossfade(()=>{if(b.dataset.id=='free')st.free=true;else{st.free=false;st.p=PRESETS.find(p=>p.id==b.dataset.id)}reset()})})}
function freeUI(){$('#free').hidden=!st.free;$('#freeChips').innerHTML=st.freeA.map(t=>`<span title="${desc(t)}">${t} · ${name(t)}<b data-t="${t}" aria-label="remover">×</b></span>`).join('');
 document.querySelectorAll('#freeChips b').forEach(b=>b.onclick=()=>{st.freeA=st.freeA.filter(x=>x!=b.dataset.t);ga('control_change',{control:'free_remove',value:b.dataset.t});reset()});$('#freeBench').value=st.freeB}
function reset(){st.playing=false;$('#play').textContent='▶';st.sel=null;st.hidden.clear();
 const idx=st.tf=='w'?WE:DI;N=Math.min(idx.length,st.tf=='w'?156:260);DT=idx.slice(idx.length-N).map(i=>D.dates[i]);
 presets();freeUI();$('#presetName').textContent=st.free?'Modo livre':st.p.name;$('#benchName').textContent='BENCHMARK: '+bench()+' · '+name(bench()).toUpperCase();$('#presetDesc').innerHTML=st.free?'Escolha ativos de qualquer grupo (ações, FIIs, ETFs, países, fatores, commodities, moedas) e um benchmark. A busca aceita ticker ou nome.':(st.p.desc||'');
 rebuild();st.minEnd=Math.min(N-1,Math.max(0,...data.map(d=>d.first))+st.trail);
 st.end=N-1;st.T=N-1;$('#time').max=N-1;$('#time').min=st.minEnd;$('#time').value=st.end;
 $('#unitH').textContent=st.tf=='w'?'Sem.':'Ses.';$('#empty').hidden=data.length>0;
 legend();table();detail();grow();writeHash()}
function writeHash(){const h=`#p=${st.free?'free':st.p.id}&tf=${st.tf}&tr=${st.trail}&s=${st.smooth}`+(st.free?`&a=${st.freeA.join(',')}&b=${st.freeB}`:'');history.replaceState(null,'',h)}
function readHash(){const q=new URLSearchParams(location.hash.slice(1));if(!q.get('p'))return;
 if(q.get('p')=='free'){st.free=true;if(q.get('a'))st.freeA=q.get('a').split(',').filter(t=>D.series[t]).slice(0,15);if(D.series[q.get('b')])st.freeB=q.get('b')}else st.p=PRESETS.find(p=>p.id==q.get('p'))||st.p;
 if(q.get('tf')=='d')st.tf='d';const cl=(v,a,b,d)=>{v=+v;return v>=a&&v<=b?v:d};st.trail=cl(q.get('tr'),4,26,10);st.smooth=cl(q.get('s'),5,26,10)}
function toast(t){const el=$('#toast');el.textContent=t;el.hidden=false;setTimeout(()=>el.hidden=true,2400)}
function bindUI(){
 const uni=Object.entries(META.info).sort((a,b)=>a[1].group.localeCompare(b[1].group)||a[0].localeCompare(b[0]));
 $('#tickers').innerHTML=uni.map(([t,i])=>`<option value="${t}" label="${t} · ${i.name} — ${GROUPS[i.group]||''}">${t} ${i.name} ${i.desc||''}</option>`).join('');
 const bopts=['IBOV','IFIX','SPY','^GSPC','^IXIC','URTH','ACWI','AOR','DBC','FXBASKET','BOVA11','IVVB11','SMLL','IDIV'].filter(t=>D.series[t]);
 $('#freeBench').innerHTML=bopts.map(t=>`<option value="${t}">${t} · ${name(t)}</option>`).join('')+`<optgroup label="Outro ativo">${uni.filter(([t])=>!bopts.includes(t)).map(([t,i])=>`<option value="${t}">${t} · ${i.name}</option>`).join('')}</optgroup>`;
 $('#freeIn').onchange=e=>{let v=e.target.value.trim();e.target.value='';const vu=v.toUpperCase().split(' ')[0];if(D.series[vu])v=vu;else{const lo=v.toLowerCase(),E=Object.entries(META.info),hit=E.find(([t,i])=>i.name.toLowerCase().includes(lo))||E.find(([t,i])=>(i.desc||'').toLowerCase().includes(lo));v=hit?hit[0]:vu}
  if(!D.series[v]){toast(`"${v}" não está no universo disponível`);return}if(st.freeA.includes(v))return;if(st.freeA.length>=15){toast('Máximo de 15 ativos');return}
  st.freeA.push(v);ga('free_mode_add',{asset:v});reset()};
 $('#freeBench').onchange=e=>{st.freeB=e.target.value;ga('benchmark_change',{benchmark:st.freeB});reset()};
 document.querySelectorAll('#tf button').forEach(b=>b.onclick=()=>{st.tf=b.dataset.v;syncCtrls();ga('control_change',{control:'timeframe',value:st.tf});reset()});
 $('#trail').oninput=e=>{st.trail=+e.target.value;$('#trailV').textContent=st.trail;st.minEnd=Math.min(N-1,Math.max(0,...data.map(d=>d.first))+st.trail);$('#time').min=st.minEnd;if(st.end<st.minEnd){st.end=st.T=st.minEnd}st.prog=st.trail;render();kick()};
 $('#trail').onchange=()=>{ga('control_change',{control:'trail',value:st.trail});writeHash();grow()};
 $('#smooth').oninput=e=>{st.smooth=+e.target.value;$('#smoothV').textContent=st.smooth;rebuild();st.prog=st.trail;render();kick()};
 $('#smooth').onchange=()=>{ga('control_change',{control:'smoothing',value:st.smooth});reset()};
 $('#time').oninput=e=>{play(false);st.end=+e.target.value;st.T=st.end;st.prog=st.trail;render()};
 $('#time').onchange=()=>ga('control_change',{control:'time_slider',value:DT[st.end]});
 $('#play').onclick=()=>{play(!st.playing);ga('play_toggle',{state:st.playing?'play':'pause',tf:st.tf})};$('#replay').onclick=()=>{ga('control_change',{control:'replay'});grow()};
 $('#share').onclick=()=>{writeHash();const u=location.href;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast('Link da configuração copiado'),()=>toast(u));ga('share_link',{preset:st.free?'free':st.p.id})};
 $('#png').onclick=()=>{ga('png_export',{preset:st.free?'free':st.p.id});const s=new XMLSerializer().serializeToString(svg),img=new Image(),c=document.createElement('canvas');c.width=1440;c.height=1240;
  img.onload=()=>{const g=c.getContext('2d');g.drawImage(img,0,0,1440,1240);g.fillStyle='#71717a';g.font='22px monospace';g.fillText(`${st.free?'Modo livre':st.p.name} · celowiz.github.io/rrg`,110,40);const a=document.createElement('a');a.download=`rrg-${st.free?'livre':st.p.id}-${DT[st.end]}.png`;a.href=c.toDataURL();a.click();toast('PNG exportado')};
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg" width="720" height="620"'))};
 document.querySelectorAll('a[href^="http"]').forEach(a=>a.addEventListener('click',()=>ga('outbound_click',{link_url:a.href,link_text:a.textContent.trim().slice(0,60)})));
}
function syncCtrls(){document.querySelectorAll('#tf button').forEach(x=>x.classList.toggle('on',x.dataset.v==st.tf));$('#trail').value=st.trail;$('#trailV').textContent=st.trail;$('#smooth').value=st.smooth;$('#smoothV').textContent=st.smooth}
async function boot(){
 try{const [m,p]=await Promise.all([fetch('data/meta.json',{cache:'no-cache'}).then(r=>r.json()),fetch('data/prices.json',{cache:'no-cache'}).then(r=>r.json())]);META=m;D=p}
 catch(e){$('#status').textContent='Não foi possível carregar os dados agora. Tente recarregar a página.';return}
 PRESETS=META.presets;st.p=PRESETS[0];WE=RRG.weekEnds(D.dates);DI=D.dates.map((_,i)=>i);
 $('#status').innerHTML=`Dados até <b>${fmt(META.last_date)}</b> · fontes: <a href="https://www.b3.com.br/pt_br/market-data-e-indices/indices/" target="_blank" rel="noopener">B3</a> (Ibovespa, IFIX e índices setoriais) e <a href="https://finance.yahoo.com/" target="_blank" rel="noopener">Yahoo Finance</a> (ações, FIIs, ETFs; fechamento ajustado) · atualização diária automática`+(META.notes.length?`<details><summary>Observações sobre os dados (${META.notes.length})</summary><ul>${META.notes.map(n=>`<li>${n}</li>`).join('')}</ul></details>`:'');
 readHash();syncCtrls();bindUI();reset()}
boot();

'use strict';
(()=>{
 const $=s=>document.querySelector(s);
 const posts=[
  {pos:1,title:'"Sabe o fornecedor que só responde no dia seguinte?" — atendimento ágil',format:'Foto',date:'28/set',views:415,reach:314,likes:2,comments:0,img:null,url:null},
  {pos:2,title:'"Um dia sem imprevistos de material" — eficiência operacional',format:'Reel',date:'21/out',views:286,reach:163,likes:7,comments:0,img:'assets/posts/post-eficiencia.jpg',url:'https://www.instagram.com/aquatrosuprimentoscm/reel/Dewg26oERzi/'},
  {pos:3,title:'"Ainda acha que a Aquatro é só a empresa do toner?" — catálogo completo',format:'Carrossel',date:'12/out',views:224,reach:49,likes:0,comments:2,img:'assets/posts/post-catalogo.jpg',url:'https://www.instagram.com/aquatrosuprimentoscm/p/DeZSrjziIEB/'},
  {pos:4,title:'Homenagem ao Dia da Secretária',format:'Foto',date:'30/set',views:217,reach:151,likes:4,comments:0,img:null,url:null},
  {pos:5,title:'Checklist de orçamento 2027 — 3 perguntas sobre estoque',format:'Carrossel',date:'7/out',views:213,reach:49,likes:0,comments:2,img:'assets/posts/post-checklist.jpg',url:'https://www.instagram.com/aquatrosuprimentoscm/'},
 ];
 function renderPosts(){
  const target=$('#ranked-posts');if(!target)return;
  target.innerHTML=posts.map(p=>`<article class="post">
   <div class="post-media">
    ${p.img?`<a href="${p.url}" target="_blank" rel="noopener"><img src="${p.img}" alt="Capa da publicação: ${p.title}" loading="lazy"></a>`:
      `<div class="post-image-pending">Imagem em alta qualidade pendente — aguardando pauta/BM</div>`}
    <div class="media-caption">${p.format} · ${p.date}</div>
   </div>
   <div class="post-info">
    <div class="post-index">${String(p.pos).padStart(2,'0')}<span>RANKING POR VISUALIZAÇÕES · 27/SET–26/OUT</span></div>
    <h3>${p.title}</h3>
    <div class="post-stats">
     <div><strong>${p.views}</strong><span>Views</span></div>
     <div><strong>${p.reach}</strong><span>Alcance</span></div>
     <div><strong>${p.likes||p.comments}</strong><span>${p.likes?'Curtidas':'Comentários'}</span></div>
    </div>
    <div class="engagement">${p.comments} comentário(s) · ${p.likes} curtida(s)</div>
    ${p.url&&/\/(p|reel)\//.test(p.url)?`<a class="download" href="${p.url}" target="_blank" rel="noopener">Ver publicação no Instagram ↗</a>`
          :`<a class="download" href="${p.url||'https://www.instagram.com/aquatrosuprimentoscm/'}" target="_blank" rel="noopener">Ver perfil no Instagram ↗</a>`}
   </div>
  </article>`).join('');
 }
 function renderCharts(){
  const C=window.AquatroCharts;if(!C)return;
  C.bars('views-chart','Visualizações orgânicas no Instagram','Comparação entre os 30 dias anteriores e o período de 27/set a 26/out de 2026.',
   [{label:'30 dias anteriores',value:139700,color:'var(--cream)'},{label:'27/set–26/out',value:236000,color:'var(--red)'}],
   'Fonte: Meta Business Suite → Insights → Instagram. 100% orgânico — nenhuma conta de anúncios ativa para a Aquatro.');
  C.bars('facebook-chart','Visualizações no Facebook','Canal secundário — mesmo conteúdo do Instagram, replicado automaticamente.',
   [{label:'30 dias anteriores',value:1872,color:'var(--cream)'},{label:'27/set–26/out',value:3500,color:'var(--red)'}],
   'Fonte: Meta Business Suite → Insights → Facebook. Base pequena (25 seguidores); leitura é de direção, não de volume.');
  C.bars('post-actions-chart','Os 5 conteúdos mais vistos do período','Visualizações de cada post, em ordem decrescente.',
   posts.map(p=>({label:p.format+' · '+p.date,value:p.views,color:p.pos===1?'var(--red)':'var(--cream)'})),
   'Fonte: Meta Business Suite → Conteúdo. O post sobre atendimento lento liderou o ranking por visualizações.');
  C.demoBars('age-gender-chart','Faixa etária e gênero da audiência','Participação percentual de cada faixa na base de seguidores do Instagram.',
   [{age:'18-24',f:5.5,m:1},{age:'25-34',f:27,m:6},{age:'35-44',f:29,m:7},{age:'45-54',f:13,m:4},{age:'55-64',f:3,m:1},{age:'65+',f:1,m:0.3}],
   'Fonte: Meta Business Suite → Público → Instagram. Mulheres de 25 a 44 anos somam mais da metade da base.');
  C.gender('gender-ring',19.2,80.8,1350,'Fonte: Meta Business Suite → Público.');
 }
 document.addEventListener('DOMContentLoaded',()=>{renderPosts();renderCharts();});
})();

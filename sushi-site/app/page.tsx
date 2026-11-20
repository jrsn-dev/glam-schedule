'use client';
import {useEffect,useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger,useGSAP);
const photo={hero:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1600&q=85',story:'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=85',starter:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&q=85',nigiri:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1000&q=85',uramaki:'https://images.unsplash.com/photo-1553621042-f6e147245754?w=1000&q=85',dessert:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1000&q=85',event:'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=85',ingredients:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1400&q=85',booking:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=85'};
const dishes=[
{id:'starter',tag:'01 / ENTRADAS',title:'O primeiro encanto.',body:'Sabores delicados que despertam os sentidos.',img:photo.starter},
{id:'nigiri',tag:'02 / NIGIRIS',title:'A precisão do gesto.',body:'Cada corte, cada grão, cada detalhe em equilíbrio.',img:photo.nigiri},
{id:'uramaki',tag:'03 / URAMAKIS',title:'Surpreenda o paladar.',body:'Texturas e combinações preparadas na hora.',img:photo.uramaki},
{id:'dessert',tag:'04 / SOBREMESAS',title:'Um final inesquecível.',body:'Uma despedida delicada, para guardar na memória.',img:photo.dessert},
];
function useSmoothScroll(){
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const lenis=new Lenis({duration:1.15,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);
 const tick=(t:number)=>lenis.raf(t*1000);gsap.ticker.add(tick);
 const refresh=()=>ScrollTrigger.refresh();window.addEventListener('load',refresh);
 document.fonts?.ready.then(refresh).catch(()=>{});
 return()=>{gsap.ticker.remove(tick);lenis.destroy();window.removeEventListener('load',refresh)}},[]);
}
function Split({id,image,number,eyebrow,title,body,reverse=false}:{id:string,image:string,number:string,eyebrow:string,title:string,body:string,reverse?:boolean}){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
 const tl=gsap.timeline({scrollTrigger:{trigger:ref.current,start:'top 88%',end:'center 43%',scrub:1}});
 tl.fromTo('.split-photo',{xPercent:-12,yPercent:15,clipPath:'inset(0% 100% 0% 0%)',opacity:.3},{xPercent:0,yPercent:0,clipPath:'inset(0% 0% 0% 0%)',opacity:1,duration:1,ease:'none'},0)
   .fromTo('.split-text',{xPercent:12,opacity:.25},{xPercent:0,opacity:1,duration:1,ease:'none'},.12)
   .fromTo('.split-text > *',{y:55,opacity:0},{y:0,opacity:1,stagger:.14,duration:.7,ease:'none'},.35)
   .fromTo('.image-caption',{y:20,opacity:0},{y:0,opacity:1,duration:.55},.65);
 });return()=>mm.revert()},{scope:ref});
 return <section id={id} ref={ref} className={'split '+(reverse?'reverse':'')}><div className="split-photo"><img src={image} alt="" loading="lazy"/><span className="image-caption">HANAMI — JAPANESE ART</span></div><div className="split-text"><span className="eyebrow">{eyebrow}</span><small className="split-number">{number} / 04</small><h2>{title}</h2><p>{body}</p><a className="text-link" href="#reservas">DESCUBRA MAIS ↗</a></div></section>;
}
function Hero(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{
   const mm=gsap.matchMedia();
   mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
     const tl=gsap.timeline({
       defaults:{ease:'power2.out'},
       scrollTrigger:{trigger:ref.current,start:'top top',end:'+=210%',pin:true,scrub:1.15,anticipatePin:1,invalidateOnRefresh:true}
     });
     // A tábua aproxima-se primeiro; cada ingrediente encontra seu lugar na sequência.
     tl.fromTo('.combo-platter',{opacity:0,scale:.64,rotate:-14,y:170},{opacity:1,scale:1,rotate:0,y:0,duration:1.0,ease:'power3.out'},0)
       .fromTo('.combo-glow',{opacity:0,scale:.6},{opacity:.65,scale:1,duration:1.2},0.15);
     const routes=[
       {x:-510,y:-280,r:-65},{x:460,y:-300,r:54},{x:-560,y:95,r:-48},
       {x:510,y:160,r:72},{x:-100,y:470,r:36},{x:230,y:490,r:-35},
     ];
     routes.forEach((p,i)=>{
       tl.fromTo('.combo-piece-'+i,
         {x:p.x,y:p.y,rotate:p.r,scale:.45,opacity:0},
         {x:0,y:0,rotate:i%2===0?-8:8,scale:1,opacity:1,duration:.9,ease:'power3.out'},.45+i*.21);
     });
     tl.fromTo('.combo-wasabi',{x:250,y:240,rotate:65,scale:.5,opacity:0},{x:0,y:0,rotate:0,scale:1,opacity:1,duration:.85},1.55)
       .fromTo('.combo-ginger',{x:-280,y:230,rotate:-45,scale:.5,opacity:0},{x:0,y:0,rotate:0,scale:1,opacity:1,duration:.85},1.72)
       .fromTo('.combo-hashi',{x:480,y:-280,rotate:65,opacity:0},{x:0,y:0,rotate:-23,opacity:1,duration:1.1},1.9)
       .fromTo('.combo-seal',{y:35,opacity:0},{y:0,opacity:1,duration:.7},2.15)
       .to('.hero-progress-fill',{scaleX:1,duration:2.5,ease:'none'},0)
       .to('.hero-copy',{y:-35,opacity:.72,duration:1.0},1.7);
     return()=>{tl.scrollTrigger?.kill();tl.kill()};
   });
   mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)',()=>{
     gsap.fromTo('.combo-platter, .combo-piece, .combo-hashi, .combo-wasabi, .combo-ginger',
       {y:35,opacity:0},{y:0,opacity:1,duration:.85,stagger:.1,ease:'power2.out',delay:.15});
   });
   return()=>mm.revert();
 },{scope:ref});
 return <section className="hero hero-assembly" ref={ref} id="inicio">
   <header className="header"><a className="brand" href="#inicio">花 <span>HANAMI <small>SUSHI EXPERIENCE</small></span></a><nav aria-label="Navegação principal"><a href="#historia">Nossa história</a><a href="#cardapio">Cardápio</a><a href="#ingredientes">Ingredientes</a><a href="#contato">Contato</a></nav><a className="nav-book" href="#reservas">RESERVAR ↗</a></header>
   <span className="hero-kanji" aria-hidden="true">寿司</span>
   <div className="hero-copy"><span className="eyebrow">A ARTE DO SUSHI</span><h1>Uma obra<br/>montada em <em>detalhes.</em></h1><p>Role para acompanhar cada peça encontrar o seu lugar. Uma experiência preparada com tempo, precisão e cuidado.</p><a className="outline-button" href="#cardapio">DESCUBRA NOSSO CARDÁPIO ↗</a></div>
   <div className="combo-stage" role="img" aria-label="Combo japonês sendo montado com seis peças de sushi, wasabi, gengibre e hashi">
     <div className="combo-glow" aria-hidden="true"/>
     <div className="combo-platter" aria-hidden="true"><div className="combo-grain"/><div className="combo-platter-center"/></div>
     {[
       {kind:'salmon',top:'23%',left:'20%'},{kind:'tuna',top:'18%',left:'49%'},{kind:'uramaki',top:'45%',left:'15%'},
       {kind:'salmon',top:'43%',left:'57%'},{kind:'uramaki',top:'67%',left:'29%'},{kind:'tuna',top:'64%',left:'60%'}
     ].map((piece,i)=><div key={i} className={'combo-piece combo-piece-'+i+' '+piece.kind} style={{top:piece.top,left:piece.left}}>
        <div className="sushi-nori"><div className="sushi-rice"><div className="sushi-filling"/></div></div>
       </div>)}
     <span className="combo-wasabi" aria-hidden="true"/><span className="combo-ginger" aria-hidden="true"/>
     <span className="combo-hashi" aria-hidden="true"><i/><i/></span>
     <span className="combo-seal">OMAKASE • HANAMI</span>
   </div>
   <span className="hero-side">JAPANESE DINING · EST. 2026</span>
   <div className="hero-progress"><span className="hero-progress-fill"/></div>
   <a className="scroll-cue" href="#historia">↓ ROLE PARA MONTAR O COMBO</a>
 </section>;
}
function Menu(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();
 mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
 const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:ref.current,start:'top top',end:'+=400%',pin:true,scrub:1,anticipatePin:1,invalidateOnRefresh:true}});
 tl.to('.menu-intro',{yPercent:-70,opacity:0,duration:.55},0);
 dishes.forEach((d,i)=>{const scope='[data-dish="'+d.id+'"]',dir=i%2===0?-1:1;
 tl.fromTo(scope+' .dish-photo',{yPercent:135,xPercent:dir*25,scale:.8,opacity:0,rotate:dir*12},{yPercent:0,xPercent:0,scale:1,opacity:1,rotate:0,duration:.7,ease:'power2.out'},i);
 tl.fromTo(scope+' .dish-copy > *',{y:90,opacity:0,clipPath:'inset(0% 0% 100% 0%)'},{y:0,opacity:1,clipPath:'inset(0% 0% 0% 0%)',duration:.55,stagger:.12},i+.24);
 tl.fromTo(scope+' .dish-trail',{scaleX:0,opacity:0},{scaleX:1,opacity:.55,duration:.5},i+.18);
 if(i<dishes.length-1)tl.to([scope+' .dish-photo',scope+' .dish-copy',scope+' .dish-trail'],{yPercent:-130,xPercent:dir*-20,opacity:0,scale:.8,duration:.65,ease:'power2.in'},i+1);
 });
 });return()=>mm.revert()},{scope:ref});
 return <section className="menu" id="cardapio" ref={ref}><div className="menu-intro"><span className="eyebrow">UMA JORNADA DE SABORES</span><h2>Nosso <em>cardápio.</em></h2><p>Uma experiência pensada em cada detalhe, do primeiro encontro ao último sabor.</p></div>{dishes.map((d,i)=><article key={d.id} data-dish={d.id} className={'dish '+(i%2===0?'left':'right')}><div className="dish-photo"><img src={d.img} alt={'Prato ilustrativo: '+d.tag} loading="lazy"/></div><span className="dish-trail" aria-hidden="true"/><div className="dish-copy"><span className="eyebrow">{d.tag}</span><h3>{d.title}</h3><p>{d.body}</p><a className="text-link" href="#reservas">VIVA ESSA EXPERIÊNCIA ↗</a></div></article>)}</section>;
}
function Ingredients(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
 const tl=gsap.timeline({scrollTrigger:{trigger:ref.current,start:'top 82%',end:'center 40%',scrub:1}});
 [[-260,150,-40],[240,-220,25],[260,200,40],[-230,-160,-35]].forEach(([x,y,rotate],i)=>tl.fromTo('.ingredient-'+i,{x,y,rotate,opacity:0,scale:.45},{x:0,y:0,rotate:0,opacity:1,scale:1,duration:1,ease:'none'},i*.17));
 tl.fromTo('.ingredient-photo',{y:180,scale:.65,opacity:0,rotate:-8},{y:0,scale:1,opacity:1,rotate:0,duration:1.3,ease:'none'},.15);
 tl.fromTo('.ingredients > .eyebrow, .ingredients > h2, .ingredients > p',{y:45,opacity:0},{y:0,opacity:1,stagger:.2,duration:.7},.05);
 });return()=>mm.revert()},{scope:ref});
 return <section className="ingredients" id="ingredientes" ref={ref}><span className="eyebrow">NOSSA ESSÊNCIA</span><h2>A beleza está<br/>na <em>origem.</em></h2><p>Respeitamos cada ingrediente. Selecionamos com cuidado. Preparamos com intenção.</p><div className="ingredient-stage"><div className="ingredient-photo"><img src={photo.ingredients} alt="Ingredientes frescos da culinária japonesa" loading="lazy"/></div>{['鮮','匠','味','心'].map((ch,i)=><div key={ch} className={'ingredient ingredient-'+i}>{ch}<small>{['FRESCOR','PRECISÃO','SABOR','ESSÊNCIA'][i]}</small></div>)}</div></section>;
}
function Booking(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
 gsap.fromTo('.booking-band',{clipPath:'inset(15% 0 15% 0)'},{clipPath:'inset(0% 0 0% 0)',scrollTrigger:{trigger:ref.current,start:'top 85%',end:'top 25%',scrub:true}});
 gsap.fromTo('.booking-bg',{yPercent:-12},{yPercent:12,scrollTrigger:{trigger:ref.current,start:'top bottom',end:'bottom top',scrub:true}});
 gsap.fromTo('.booking-content > *',{opacity:0,y:80},{opacity:1,y:0,stagger:.2,duration:.8,ease:'power2.out',scrollTrigger:{trigger:ref.current,start:'top 76%',end:'center 58%',scrub:1}});
 });return()=>mm.revert()},{scope:ref});
 return <section ref={ref} id="reservas" className="booking"><div className="booking-band"><img className="booking-bg" src={photo.booking} alt="" loading="lazy"/><div className="booking-content"><span className="eyebrow">SEU LUGAR À MESA</span><h2>Uma experiência<br/><em>para lembrar.</em></h2><p>Descubra o prazer de viver a gastronomia japonesa com todos os sentidos.</p><a className="outline-button" href="mailto:contato@exemplo.com?subject=Reserva%20Hanami%20Sushi">SOLICITAR RESERVA ↗</a></div></div><footer id="contato" className="footer"><div><a href="#inicio" className="brand">花 <span>HANAMI</span></a><p>Gastronomia japonesa, tempo e intenção.</p></div><div><strong>NAVEGUE</strong><a href="#historia">Nossa história</a><a href="#cardapio">Cardápio</a><a href="#ingredientes">Ingredientes</a></div><div><strong>CONTATO</strong><p>Endereço e contato a definir pelo restaurante.</p></div><div><strong>REDES</strong><p>Instagram e redes sociais a definir.</p><small>© {new Date().getFullYear()} Hanami Sushi</small></div></footer></section>;
}
export default function Home(){useSmoothScroll();return <main><Hero/><Split id="historia" image={photo.story} number="01" eyebrow="A ESSÊNCIA POR TRÁS DE CADA PEÇA" title="Uma história contada em sabores." body="Mais do que preparar sushi, cultivamos o encontro entre tradição e criatividade. Cada escolha nasce do respeito aos ingredientes e da dedicação ao gesto."/><section className="quote"><span className="eyebrow">MAIS DO QUE UMA REFEIÇÃO</span><p>“A verdadeira arte revela-se nos <em>pequenos detalhes.</em>”</p><span aria-hidden="true">花</span></section><Menu/><Split id="eventos" image={photo.event} number="03" eyebrow="MOMENTOS QUE PERMANECEM" title="Encontros que viram memórias." body="Uma noite especial merece sabores extraordinários. Compartilhe a experiência de estar à mesa e descubra a beleza dos rituais japoneses." reverse/><Ingredients/><Booking/></main>}

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
 gsap.from('.split-photo',{y:75,opacity:0,duration:1,scrollTrigger:{trigger:ref.current,start:'top 85%',toggleActions:'play none none reverse'}});
 gsap.from('.split-text > *',{y:35,opacity:0,stagger:.12,duration:.9,scrollTrigger:{trigger:ref.current,start:'top 78%',toggleActions:'play none none reverse'}});
 });return()=>mm.revert()},{scope:ref});
 return <section id={id} ref={ref} className={'split '+(reverse?'reverse':'')}><div className="split-photo"><img src={image} alt="" loading="lazy"/><span className="image-caption">HANAMI — JAPANESE ART</span></div><div className="split-text"><span className="eyebrow">{eyebrow}</span><small className="split-number">{number} / 04</small><h2>{title}</h2><p>{body}</p><a className="text-link" href="#reservas">DESCUBRA MAIS ↗</a></div></section>;
}
function Hero(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
 [['.hero-copy',-13],['.hero-photo',-29],['.hero-kanji',-8],['.hero-ring',-35]].forEach(([selector,y])=>gsap.to(selector as string,{yPercent:y as number,ease:'none',scrollTrigger:{trigger:ref.current,start:'top top',end:'bottom top',scrub:true}}));
 });return()=>mm.revert()},{scope:ref});
 return <section className="hero" ref={ref} id="inicio"><header className="header"><a className="brand" href="#inicio">花 <span>HANAMI <small>SUSHI EXPERIENCE</small></span></a><nav aria-label="Navegação principal"><a href="#historia">Nossa história</a><a href="#cardapio">Cardápio</a><a href="#ingredientes">Ingredientes</a><a href="#contato">Contato</a></nav><a className="nav-book" href="#reservas">RESERVAR ↗</a></header><span className="hero-kanji" aria-hidden="true">寿司</span><div className="hero-copy"><span className="eyebrow">A ARTE DO SUSHI</span><h1>Tradição em<br/>cada <em>detalhe.</em></h1><p>Uma experiência que celebra o tempo, o cuidado e a essência da gastronomia japonesa.</p><a className="outline-button" href="#cardapio">EXPLORE NOSSO CARDÁPIO ↗</a></div><div className="hero-photo"><div className="hero-ring"/><img src={photo.hero} alt="Seleção de sushi japonês" fetchPriority="high"/></div><span className="hero-side">JAPANESE DINING · EST. 2026</span><a className="scroll-cue" href="#historia">↓ ROLE PARA EXPLORAR</a></section>;
}
function Menu(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();
 mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
 const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:ref.current,start:'top top',end:'+=400%',pin:true,scrub:1,anticipatePin:1,invalidateOnRefresh:true}});
 tl.to('.menu-intro',{yPercent:-70,opacity:0,duration:.55},0);
 dishes.forEach((d,i)=>{const scope='[data-dish="'+d.id+'"]',dir=i%2===0?-1:1;
 tl.fromTo(scope+' .dish-photo',{yPercent:135,xPercent:dir*25,scale:.8,opacity:0,rotate:dir*12},{yPercent:0,xPercent:0,scale:1,opacity:1,rotate:0,duration:.7,ease:'power2.out'},i);
 tl.fromTo(scope+' .dish-copy',{y:65,opacity:0},{y:0,opacity:1,duration:.5},i+.24);
 tl.fromTo(scope+' .dish-trail',{scaleX:0,opacity:0},{scaleX:1,opacity:.55,duration:.5},i+.18);
 if(i<dishes.length-1)tl.to([scope+' .dish-photo',scope+' .dish-copy',scope+' .dish-trail'],{yPercent:-130,xPercent:dir*-20,opacity:0,scale:.8,duration:.65,ease:'power2.in'},i+1);
 });
 });return()=>mm.revert()},{scope:ref});
 return <section className="menu" id="cardapio" ref={ref}><div className="menu-intro"><span className="eyebrow">UMA JORNADA DE SABORES</span><h2>Nosso <em>cardápio.</em></h2><p>Uma experiência pensada em cada detalhe, do primeiro encontro ao último sabor.</p></div>{dishes.map((d,i)=><article key={d.id} data-dish={d.id} className={'dish '+(i%2===0?'left':'right')}><div className="dish-photo"><img src={d.img} alt={'Prato ilustrativo: '+d.tag} loading="lazy"/></div><span className="dish-trail" aria-hidden="true"/><div className="dish-copy"><span className="eyebrow">{d.tag}</span><h3>{d.title}</h3><p>{d.body}</p><a className="text-link" href="#reservas">VIVA ESSA EXPERIÊNCIA ↗</a></div></article>)}</section>;
}
function Ingredients(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
 const tl=gsap.timeline({scrollTrigger:{trigger:ref.current,start:'top 75%',end:'center 45%',scrub:1}});
 [[-180,130,-25],[160,-130,18],[150,170,35],[-120,-160,-22]].forEach(([x,y,rotate],i)=>tl.from('.ingredient-'+i,{x,y,rotate,opacity:0,scale:.6,duration:1},i*.15));
 tl.from('.ingredient-photo',{y:140,scale:.8,opacity:0,duration:1},.12);
 });return()=>mm.revert()},{scope:ref});
 return <section className="ingredients" id="ingredientes" ref={ref}><span className="eyebrow">NOSSA ESSÊNCIA</span><h2>A beleza está<br/>na <em>origem.</em></h2><p>Respeitamos cada ingrediente. Selecionamos com cuidado. Preparamos com intenção.</p><div className="ingredient-stage"><div className="ingredient-photo"><img src={photo.ingredients} alt="Ingredientes frescos da culinária japonesa" loading="lazy"/></div>{['鮮','匠','味','心'].map((ch,i)=><div key={ch} className={'ingredient ingredient-'+i}>{ch}<small>{['FRESCOR','PRECISÃO','SABOR','ESSÊNCIA'][i]}</small></div>)}</div></section>;
}
function Booking(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
 gsap.fromTo('.booking-band',{clipPath:'inset(15% 0 15% 0)'},{clipPath:'inset(0% 0 0% 0)',scrollTrigger:{trigger:ref.current,start:'top 85%',end:'top 25%',scrub:true}});
 gsap.fromTo('.booking-bg',{yPercent:-12},{yPercent:12,scrollTrigger:{trigger:ref.current,start:'top bottom',end:'bottom top',scrub:true}});
 });return()=>mm.revert()},{scope:ref});
 return <section ref={ref} id="reservas" className="booking"><div className="booking-band"><img className="booking-bg" src={photo.booking} alt="" loading="lazy"/><div className="booking-content"><span className="eyebrow">SEU LUGAR À MESA</span><h2>Uma experiência<br/><em>para lembrar.</em></h2><p>Descubra o prazer de viver a gastronomia japonesa com todos os sentidos.</p><a className="outline-button" href="mailto:contato@exemplo.com?subject=Reserva%20Hanami%20Sushi">SOLICITAR RESERVA ↗</a></div></div><footer id="contato" className="footer"><div><a href="#inicio" className="brand">花 <span>HANAMI</span></a><p>Gastronomia japonesa, tempo e intenção.</p></div><div><strong>NAVEGUE</strong><a href="#historia">Nossa história</a><a href="#cardapio">Cardápio</a><a href="#ingredientes">Ingredientes</a></div><div><strong>CONTATO</strong><p>Endereço e contato a definir pelo restaurante.</p></div><div><strong>REDES</strong><p>Instagram e redes sociais a definir.</p><small>© {new Date().getFullYear()} Hanami Sushi</small></div></footer></section>;
}
export default function Home(){useSmoothScroll();return <main><Hero/><Split id="historia" image={photo.story} number="01" eyebrow="A ESSÊNCIA POR TRÁS DE CADA PEÇA" title="Uma história contada em sabores." body="Mais do que preparar sushi, cultivamos o encontro entre tradição e criatividade. Cada escolha nasce do respeito aos ingredientes e da dedicação ao gesto."/><section className="quote"><span className="eyebrow">MAIS DO QUE UMA REFEIÇÃO</span><p>“A verdadeira arte revela-se nos <em>pequenos detalhes.</em>”</p><span aria-hidden="true">花</span></section><Menu/><Split id="eventos" image={photo.event} number="03" eyebrow="MOMENTOS QUE PERMANECEM" title="Encontros que viram memórias." body="Uma noite especial merece sabores extraordinários. Compartilhe a experiência de estar à mesa e descubra a beleza dos rituais japoneses." reverse/><Ingredients/><Booking/></main>}

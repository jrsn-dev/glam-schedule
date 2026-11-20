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
 return <section id={id} ref={ref} className={'split '+(reverse?'reverse':'')}><div className="split-photo"><img src={image} alt="" loading="lazy"/><span className="image-caption">MT SUSHI ARTE</span></div><div className="split-text"><span className="eyebrow">{eyebrow}</span><small className="split-number">{number} / 04</small><h2>{title}</h2><p>{body}</p><a className="text-link" href="#reservas">DESCUBRA MAIS ↗</a></div></section>;
}
function Hero(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{
   const mm=gsap.matchMedia();
   const flightPaths=[
     {name:'salmon-a',side:'left',rotation:-40},
     {name:'tuna-a',side:'top',rotation:36},
     {name:'uramaki',side:'right',rotation:-32},
     {name:'salmon-b',side:'bottom',rotation:42},
     {name:'tuna-b',side:'left',rotation:30},
     {name:'wasabi',side:'right',rotation:-38},
     {name:'ginger',side:'bottom',rotation:35},
     {name:'shoyu',side:'top',rotation:-25},
     {name:'hashi',side:'right',rotation:45}
   ] as const;
   // Calculate the distance from each target image to a point beyond the viewport.
   // A CSS slot still owns the final coordinates, even when resized.
   const takeoff=(target:Element,side:'left'|'right'|'top'|'bottom')=>{
     const rect=target.getBoundingClientRect();
     const margin=Math.max(120,Math.min(window.innerWidth,window.innerHeight)*.23);
     switch(side){
       case 'left':return {x:-(rect.right+margin),y:(window.innerHeight/2-rect.top)*.22};
       case 'right':return {x:window.innerWidth-rect.left+margin,y:(window.innerHeight/2-rect.top)*-.22};
       case 'top':return {x:(window.innerWidth/2-rect.left)*.26,y:-(rect.bottom+margin)};
       case 'bottom':return {x:(window.innerWidth/2-rect.left)*-.26,y:window.innerHeight-rect.top+margin};
     }
   };
   mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
     const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{
       trigger:ref.current,start:'top top',end:'+=235%',
       scrub:1.05,pin:true,anticipatePin:1,invalidateOnRefresh:true
     }});
     tl.fromTo('.combo-scene',{scale:1.62},{scale:1,duration:4.9,ease:'power2.inOut'},0);
     flightPaths.forEach((item,i)=>{
       const start=.38+i*.40;
       const el=ref.current?.querySelector<HTMLElement>('.hero-'+item.name);
       if(!el)return;
       const from=()=>takeoff(el,item.side);
       tl.fromTo(el,
         {x:()=>from().x,y:()=>from().y,rotation:item.rotation,scale:.54,autoAlpha:0,filter:'blur(16px)'},
         {x:0,y:0,rotation:0,scale:1,autoAlpha:1,filter:'blur(0px)',duration:.97,ease:'power3.out',immediateRender:true},
         start);
     });
     tl.fromTo('.combo-seal',{y:20,autoAlpha:0},{y:0,autoAlpha:1,duration:.5},3.4);
     tl.fromTo('.hero-progress-fill',{scaleX:0},{scaleX:1,duration:5.05,ease:'none'},0);
   });
   mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)',()=>{
     const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{
       trigger:ref.current,start:'top top',end:'bottom 20%',scrub:.65,invalidateOnRefresh:true
     }});
     tl.fromTo('.combo-scene',{scale:1.31},{scale:1,duration:4.15,ease:'power2.inOut'},0);
     flightPaths.forEach((item,i)=>{
       const el=ref.current?.querySelector<HTMLElement>('.hero-'+item.name);
       if(!el)return;
       const from=()=>takeoff(el,item.side);
       tl.fromTo(el,{x:()=>from().x*.8,y:()=>from().y*.8,rotation:item.rotation*.6,scale:.65,autoAlpha:0,filter:'blur(9px)'},
         {x:0,y:0,rotation:0,scale:1,autoAlpha:1,filter:'blur(0px)',duration:.7,ease:'power3.out',immediateRender:true},
         .25+i*.31);
     });
     tl.fromTo('.combo-seal',{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.4},3);
     tl.fromTo('.hero-progress-fill',{scaleX:0},{scaleX:1,duration:4.1,ease:'none'},0);
   });
   return()=>mm.revert();
 },{scope:ref});'use client';
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
 return <section id={id} ref={ref} className={'split '+(reverse?'reverse':'')}><div className="split-photo"><img src={image} alt="" loading="lazy"/><span className="image-caption">MT SUSHI ARTE</span></div><div className="split-text"><span className="eyebrow">{eyebrow}</span><small className="split-number">{number} / 04</small><h2>{title}</h2><p>{body}</p><a className="text-link" href="#reservas">DESCUBRA MAIS ↗</a></div></section>;
}
function Hero(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{
   const mm=gsap.matchMedia();
   // The final positions are managed by CSS slots. Animate only the inner images.
   const paths=[
     {name:'salmon-a',x:-245,y:-190,rotation:-27},
     {name:'tuna-a',x:230,y:-205,rotation:24},
     {name:'uramaki',x:-255,y:150,rotation:-34},
     {name:'salmon-b',x:245,y:205,rotation:28},
     {name:'tuna-b',x:-145,y:265,rotation:-23},
     {name:'wasabi',x:175,y:215,rotation:22},
     {name:'ginger',x:-190,y:205,rotation:-16},
     {name:'shoyu',x:220,y:-185,rotation:28},
     {name:'hashi',x:280,y:-210,rotation:38}
   ];
   mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
     const tl=gsap.timeline({
       defaults:{ease:'none'},
       scrollTrigger:{
         trigger:ref.current,start:'top top',end:'+=220%',
         scrub:1.15,pin:true,anticipatePin:1,invalidateOnRefresh:true
       }
     });
     // At progress=0 only the large, empty board is visible.
     // As the camera pulls back, ingredients arrive from every side.
     tl.fromTo('.combo-scene',{scale:1.52},{scale:1,duration:3.85,ease:'power2.inOut'},0);
     paths.forEach((piece,i)=>{
       const offset=.44+i*.31;
       tl.fromTo('.hero-'+piece.name,
         {xPercent:piece.x,yPercent:piece.y,rotation:piece.rotation,scale:.64,autoAlpha:0},
         {xPercent:0,yPercent:0,rotation:0,scale:1,autoAlpha:1,duration:.95,ease:'power3.out'},
         offset);
     });
     tl.fromTo('.combo-seal',{y:18,autoAlpha:0},{y:0,autoAlpha:1,duration:.45},3.0)
       .fromTo('.hero-progress-fill',{scaleX:0},{scaleX:1,duration:4.25,ease:'none'},0);
   });
   mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)',()=>{
     const tl=gsap.timeline({
       defaults:{ease:'none'},
       scrollTrigger:{
         trigger:ref.current,start:'top top',end:'bottom 18%',
         scrub:.7,invalidateOnRefresh:true
       }
     });
     // No pin on mobile; the board remains inside the normal document flow.
     tl.fromTo('.combo-scene',{scale:1.24},{scale:1,duration:3.2,ease:'power2.inOut'},0);
     paths.forEach((piece,i)=>{
       tl.fromTo('.hero-'+piece.name,
         {xPercent:piece.x*.62,yPercent:piece.y*.62,rotation:piece.rotation*.6,scale:.72,autoAlpha:0},
         {xPercent:0,yPercent:0,rotation:0,scale:1,autoAlpha:1,duration:.72,ease:'power2.out'},
         .34+i*.24);
     });
     tl.fromTo('.combo-seal',{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.4},2.5)
       .fromTo('.hero-progress-fill',{scaleX:0},{scaleX:1,duration:3.2,ease:'none'},0);
   });
   return()=>mm.revert();
 },{scope:ref});function Hero(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{
   const mm=gsap.matchMedia();
   const pieces=[
     {name:'salmon-a',x:-140,y:-95,rotation:-22},
     {name:'tuna-a',x:135,y:-110,rotation:17},
     {name:'uramaki',x:-155,y:85,rotation:-16},
     {name:'salmon-b',x:140,y:80,rotation:20},
     {name:'tuna-b',x:-75,y:135,rotation:-10},
     {name:'wasabi',x:95,y:80,rotation:12},
     {name:'ginger',x:-90,y:120,rotation:-10},
     {name:'shoyu',x:130,y:-105,rotation:12},
     {name:'hashi',x:150,y:-120,rotation:13}
   ];
   mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
     const tl=gsap.timeline({
       defaults:{ease:'none'},
       scrollTrigger:{trigger:ref.current,start:'top top',end:'+=185%',scrub:0.65,pin:true,anticipatePin:1,invalidateOnRefresh:true}
     });
     pieces.forEach((piece,i)=>{
       tl.fromTo('.hero-'+piece.name,
         {xPercent:piece.x,yPercent:piece.y,rotation:piece.rotation,scale:.72,autoAlpha:0},
         {xPercent:0,yPercent:0,rotation:0,scale:1,autoAlpha:1,ease:'power2.out',duration:1},i*.26);
     });
     tl.to('.hero-progress-fill',{scaleX:1,duration:3.3,ease:'none'},0)
       .fromTo('.combo-seal',{y:10,autoAlpha:0},{y:0,autoAlpha:1,duration:.45},2.5);
   });
   mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)',()=>{
     const tl=gsap.timeline({
       scrollTrigger:{trigger:ref.current,start:'top top',end:'bottom 25%',scrub:.45}
     });
     pieces.forEach((piece,i)=>{
       tl.fromTo('.hero-'+piece.name,{yPercent:65,xPercent:piece.x*.35,rotation:piece.rotation*.4,scale:.8,autoAlpha:0},
         {yPercent:0,xPercent:0,rotation:0,scale:1,autoAlpha:1,duration:.7,ease:'power2.out'},i*.18);
     });
     tl.to('.hero-progress-fill',{scaleX:1,duration:2.2,ease:'none'},0);
   });
   return()=>mm.revert();
 },{scope:ref});
 const combo=[
   {name:'salmon-a',file:'salmon.png',label:'Nigiri de salmão'},
   {name:'tuna-a',file:'tuna.png',label:'Nigiri de atum'},
   {name:'uramaki',file:'uramaki.png',label:'Uramaki'},
   {name:'salmon-b',file:'salmon.png',label:''},
   {name:'tuna-b',file:'tuna.png',label:''},
   {name:'wasabi',file:'wasabi.png',label:'Wasabi'},
   {name:'ginger',file:'ginger.png',label:'Gengibre'},
   {name:'shoyu',file:'soy-sauce.png',label:'Shoyu'},
   {name:'hashi',file:'chopsticks.png',label:'Hashis'}
 ];
 return <section className="hero hero-assembly hero-png" ref={ref} id="inicio">
   <header className="header">
     <a className="brand" href="#inicio"><img src="/images/mt-sushi-logo.svg" alt="MT Sushi Arte" width={174} height={45}/></a>
     <nav aria-label="Navegação principal"><a href="#historia">História</a><a href="#cardapio">Cardápio</a><a href="#ingredientes">Ingredientes</a><a href="#contato">Contato</a></nav>
     <details className="mobile-nav"><summary aria-label="Abrir navegação">MENU <span aria-hidden="true">☰</span></summary><div className="mobile-nav-links"><a href="#historia">História</a><a href="#cardapio">Cardápio</a><a href="#ingredientes">Ingredientes</a><a href="#reservas">Reservas</a><a href="#contato">Contato</a></div></details><a className="nav-book" href="#reservas">RESERVAR ↗</a>
   </header>
   <div className="hero-copy">
     <span className="eyebrow">MT SUSHI ARTE · ARTESANAL</span>
     <h1>Uma experiência<br/>feita de <em>detalhes.</em></h1>
     <p>Uma tábua. Cada ingrediente em seu lugar. Role a página e descubra como nasce o nosso combo.</p>
     <a className="outline-button" href="#cardapio">EXPLORAR O CARDÁPIO ↗</a>
   </div>
   <div className="combo-stage" role="img" aria-label="Tábua escura de sushi sendo montada durante a rolagem com nigiris, uramakis, wasabi, gengibre, shoyu e hashi">
      <div className="combo-scene">
        <img className="combo-board-img" src="/img/hero/board.png" alt="" draggable={false} fetchPriority="high"/>
        {combo.map(item=><span className={'combo-slot hero-slot-'+item.name} key={item.name} aria-hidden="true">
          <img className={'combo-food hero-'+item.name} src={'/img/hero/'+item.file} alt="" draggable={false}/>
        </span>)}
        <span className="combo-seal" aria-hidden="true">MT SUSHI ARTE · COMBO</span>
      </div>
   </div>
   <div className="hero-scroll-indicator" aria-hidden="true"><span>ROLE PARA MONTAR O COMBO</span><div className="hero-progress"><span className="hero-progress-fill"/></div><span>01 / 04</span></div>
 </section>;
}
function Menu(){
 const ref=useRef<HTMLElement>(null);
 useGSAP(()=>{
   const mm=gsap.matchMedia();
   mm.add('(prefers-reduced-motion: no-preference)',()=>{
     gsap.fromTo('.menu-intro > *',{y:32,autoAlpha:0},{y:0,autoAlpha:1,stagger:.1,duration:.8,ease:'power2.out',
       scrollTrigger:{trigger:'.menu-intro',start:'top 85%',toggleActions:'play none none reverse'}});
     gsap.utils.toArray<HTMLElement>('.dish').forEach((card)=>{
       const picture=card.querySelector('.dish-photo');
       const copy=card.querySelectorAll('.dish-copy > *');
       if(picture)gsap.fromTo(picture,{y:72,scale:.9,autoAlpha:0},{y:0,scale:1,autoAlpha:1,duration:1,ease:'power2.out',
         scrollTrigger:{trigger:card,start:'top 82%',toggleActions:'play none none reverse'}});
       gsap.fromTo(copy,{y:25,autoAlpha:0},{y:0,autoAlpha:1,stagger:.13,duration:.7,ease:'power2.out',
         scrollTrigger:{trigger:card,start:'top 72%',toggleActions:'play none none reverse'}});
     });
   });
   return()=>mm.revert();
 },{scope:ref});
 return <section className="menu" id="cardapio" ref={ref}>
   <div className="menu-intro"><span className="eyebrow">UMA JORNADA DE SABORES</span><h2>Nosso <em>cardápio.</em></h2>
     <p>Da primeira peça ao último detalhe, ingredientes e técnica em harmonia.</p></div>
   <div className="menu-list">{dishes.map((d,i)=><article key={d.id} data-dish={d.id} className={'dish '+(i%2===0?'left':'right')}>
     <div className="dish-photo"><img src={d.img} alt={'Seleção ilustrativa de '+d.tag.toLowerCase()} loading="lazy"/></div>
     <div className="dish-copy"><span className="eyebrow">{d.tag}</span><h3>{d.title}</h3><p>{d.body}</p>
       <a className="text-link" href="#reservas">CONHEÇA A EXPERIÊNCIA ↗</a></div>
   </article>)}</div>
 </section>;
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
 return <section ref={ref} id="reservas" className="booking"><div className="booking-band"><img className="booking-bg" src={photo.booking} alt="" loading="lazy"/><div className="booking-content"><span className="eyebrow">SEU LUGAR À MESA</span><h2>Uma experiência<br/><em>para lembrar.</em></h2><p>Descubra o prazer de viver a gastronomia japonesa com todos os sentidos.</p><a className="outline-button" href="#contato">SOLICITAR RESERVA ↗</a></div></div><footer id="contato" className="footer"><div><a href="#inicio" className="brand"><img src="/images/mt-sushi-logo.svg" alt="MT Sushi Arte" width={172} height={44}/></a><p>Gastronomia japonesa, tempo e intenção.</p></div><div><strong>NAVEGUE</strong><a href="#historia">Nossa história</a><a href="#cardapio">Cardápio</a><a href="#ingredientes">Ingredientes</a></div><div><strong>CONTATO</strong><p>Endereço e contato a definir pelo restaurante.</p></div><div><strong>REDES</strong><p>Instagram e redes sociais a definir.</p><small>© {new Date().getFullYear()} MT Sushi Arte</small></div></footer></section>;
}
export default function Home(){useSmoothScroll();return <main><Hero/><Split id="historia" image={photo.story} number="01" eyebrow="A ESSÊNCIA POR TRÁS DE CADA PEÇA" title="Uma história contada em sabores." body="Mais do que preparar sushi, cultivamos o encontro entre tradição e criatividade. Cada escolha nasce do respeito aos ingredientes e da dedicação ao gesto."/><section className="quote"><span className="eyebrow">MAIS DO QUE UMA REFEIÇÃO</span><p>“A verdadeira arte revela-se nos <em>pequenos detalhes.</em>”</p><span aria-hidden="true"></span></section><Menu/><Split id="eventos" image={photo.event} number="03" eyebrow="MOMENTOS QUE PERMANECEM" title="Encontros que viram memórias." body="Uma noite especial merece sabores extraordinários. Compartilhe a experiência de estar à mesa e descubra a beleza dos rituais japoneses." reverse/><Ingredients/><Booking/></main>}

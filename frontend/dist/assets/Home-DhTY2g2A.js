const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ModelCursor-Bvh1u8yd.js","assets/ui-vendor-avc6CE4D.js","assets/three-vendor-_GriAIux.js","assets/Diseases-DVPTyZUl.js","assets/index-Dy5vvwnX.js","assets/animation-vendor-C0VThzDd.js","assets/index-Bjr2O1jE.css","assets/theme-9jNYhsyy.css","assets/Feature-CkeV0xMM.js","assets/ScrollTrigger-Cv03IO65.js","assets/brain-CWP5NouO.js","assets/shield-iUIpxZiR.js","assets/howItWorks-BtrGrZUB.js","assets/circle-check-NtDmZNH3.js","assets/ParentStories-D9oR4fDC.js","assets/withParents-BF7nIKP-.js","assets/supportingParents-B3BGfIJp.js","assets/heart-B1tzjaC2.js","assets/chevron-right-zo4GhhV_.js","assets/baby-C6gGV4EX.js","assets/ParentStories-BIkx6xJx.css","assets/SupportingParents-BJd7Cets.js","assets/chevron-up-DEtY7qOg.js","assets/trending-up-ZbLP6BYg.js","assets/check-C1SEc63b.js","assets/Pricing-Bo0g_14b.js"])))=>i.map(i=>d[i]);
import{m as s,S as g,L as b,_ as a,H as f}from"./index-Dy5vvwnX.js";import{j as e,r as t}from"./ui-vendor-avc6CE4D.js";import{_ as u}from"./animation-vendor-C0VThzDd.js";function v({headingRef:r,badge:n,title:o,description:l,buttonText:i}){return e.jsxs("div",{children:[e.jsxs(s.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6},className:`\r
          inline-flex\r
          items-center\r
          gap-2\r
          px-4\r
          py-2\r
          rounded-full\r
          border\r
          border-(--primary)\r
          mb-6\r
        `,children:[e.jsx(g,{size:16,className:"text-(--primary)"}),e.jsx("span",{className:"text-sm text-(--text-dark)",children:n})]}),e.jsxs("h1",{ref:r,className:`\r
          text-5xl\r
          md:text-6xl\r
          lg:text-7xl\r
          font-bold\r
          leading-tight\r
          text-(--text-dark)\r
        `,children:[o.first,e.jsx("br",{}),e.jsx("span",{className:"text-(--primary)",children:o.second})]}),e.jsx(s.p,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.4},className:`\r
          mt-6\r
          text-lg\r
          md:text-xl\r
          leading-relaxed\r
          max-w-xl\r
          text-(--text-dark)\r
        `,children:l}),e.jsx(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6},className:"flex flex-wrap gap-4 mt-8",children:e.jsx(b,{to:"/survey",className:`\r
            px-8\r
            py-4\r
            rounded-full\r
            bg-(--primary)\r
            text-white\r
            font-medium\r
            hover:scale-105\r
            hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]\r
            active:scale-95\r
            transition-all\r
            duration-300\r
            inline-block\r
          `,children:i==="Coming Soon"?"Pre-Order Survey":i})})]})}const j=t.lazy(()=>a(()=>import("./ModelCursor-Bvh1u8yd.js"),__vite__mapDeps([0,1,2])));function w(){return e.jsxs(s.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:1,ease:"easeOut"},className:`\r
        relative\r
        flex\r
        items-center\r
        justify-center\r
        h-[350px]\r
        sm:h-[450px]\r
        lg:h-[650px]\r
      `,children:[e.jsx("div",{className:`\r
          absolute\r
          w-[260px]\r
          h-[260px]\r
          sm:w-[350px]\r
          sm:h-[350px]\r
          lg:w-[500px]\r
          lg:h-[500px]\r
          rounded-full\r
          border\r
          border-(--primary)\r
          opacity-20\r
          animate-pulse\r
        `}),e.jsx("div",{className:`\r
          absolute\r
          w-[320px]\r
          h-[320px]\r
          sm:w-[450px]\r
          sm:h-[450px]\r
          lg:w-[650px]\r
          lg:h-[650px]\r
          rounded-full\r
          border\r
          border-(--primary)\r
          opacity-10\r
        `}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx(s.div,{animate:{y:[-10,10,-10]},transition:{duration:5,repeat:1/0,ease:"easeInOut"},className:"w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] flex items-center justify-center",children:e.jsx(t.Suspense,{fallback:e.jsx("div",{className:"w-12 h-12 border-4 border-(--primary) border-t-transparent rounded-full animate-spin"}),children:e.jsx(j,{})})})})]})}function _(r){t.useEffect(()=>{const n=r.current;if(!n)return;const o=n.innerHTML,l=[],i=document.createTreeWalker(n,NodeFilter.SHOW_TEXT,null),x=[];for(;i.nextNode();)x.push(i.currentNode);return x.forEach(p=>{const y=p.nodeValue||"",m=document.createDocumentFragment();[...y].forEach(h=>{if(h===" "){m.appendChild(document.createTextNode(" "));return}const c=document.createElement("span");c.textContent=h,c.style.display="inline-block",m.appendChild(c),l.push(c)}),p.parentNode.replaceChild(m,p)}),u.from(l,{scale:0,y:50,rotation:()=>u.utils.random(-20,20),stagger:{each:.03,from:"random"},duration:.5,ease:"back.out(2)"}),()=>{n.innerHTML=o}},[r])}const d={badge:"AI Powered Baby Care",title:{first:"Sleep Better,",second:"Parent Smarter"},description:"The world's first AI-powered smart cradle that learns your baby's needs, automates soothing routines, and provides peace of mind for every parent.",buttonText:"Coming Soon"};function I(){const r=t.useRef(null);return _(r),e.jsxs("section",{id:"home",className:"relative min-h-screen overflow-hidden clay-hero",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute top-20 left-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full"}),e.jsx("div",{className:"absolute bottom-10 right-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full"})]}),e.jsx("div",{className:"absolute inset-0 opacity-5",style:{backgroundImage:`
          linear-gradient(to right, var(--primary) 1px, transparent 1px),
          linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
        `,backgroundSize:"60px 60px"}}),e.jsx("div",{className:"relative z-10 max-w-7xl mx-auto px-6",children:e.jsxs("div",{className:"grid lg:grid-cols-2 items-center min-h-screen gap-12 lg:gap-16 pt-32 pb-16 lg:pt-24 lg:pb-12",children:[e.jsx(v,{headingRef:r,badge:d.badge,title:d.title,description:d.description,buttonText:d.buttonText}),e.jsx(w,{})]})})]})}const N=t.lazy(()=>a(()=>import("./Diseases-DVPTyZUl.js"),__vite__mapDeps([3,1,4,5,6,7]))),A=t.lazy(()=>a(()=>import("./Feature-CkeV0xMM.js"),__vite__mapDeps([8,1,4,5,6,9,10,11]))),P=t.lazy(()=>a(()=>import("./howItWorks-BtrGrZUB.js"),__vite__mapDeps([12,1,4,5,6,9,13]))),E=t.lazy(()=>a(()=>import("./ParentStories-D9oR4fDC.js").then(r=>r.P),__vite__mapDeps([14,4,1,5,6,15,16,17,18,19,20]))),S=t.lazy(()=>a(()=>import("./SupportingParents-BJd7Cets.js"),__vite__mapDeps([21,1,16,4,5,6,22,17,23,19,24]))),T=t.lazy(()=>a(()=>import("./Pricing-Bo0g_14b.js"),__vite__mapDeps([25,4,1,5,6,24])));function O(){return e.jsxs("div",{className:"relative bg-(--bg) text-(--text) fade-in",children:[e.jsxs(f,{children:[e.jsx("title",{children:"Maatriva | Smart Baby Care Powered by AI"}),e.jsx("meta",{name:"description",content:"Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and newborn health monitoring."}),e.jsx("meta",{name:"keywords",content:"smart cradle, infant monitoring, AI baby care, healthcare technology, newborn monitoring, baby safety, parent assistance"}),e.jsx("link",{rel:"canonical",href:"https://maatriva.co.in/"}),e.jsx("meta",{property:"og:title",content:"Maatriva | Smart Baby Care Powered by AI"}),e.jsx("meta",{property:"og:description",content:"Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and newborn health monitoring."}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:url",content:"https://maatriva.co.in/"}),e.jsx("meta",{property:"og:image",content:"https://maatriva.co.in/AIPro.jpeg"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:title",content:"Maatriva | Smart Baby Care Powered by AI"}),e.jsx("meta",{name:"twitter:description",content:"Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and newborn health monitoring."}),e.jsx("meta",{name:"twitter:image",content:"https://maatriva.co.in/AIPro.jpeg"}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify([{"@context":"https://schema.org","@type":"MedicalOrganization","@id":"https://maatriva.co.in/#organization",name:"Maatriva",url:"https://maatriva.co.in",logo:"https://maatriva.co.in/android-chrome-512x512.png",image:"https://maatriva.co.in/AIPro.jpeg",description:"Maatriva is an innovative MedTech startup in India building the world's first AI-powered smart baby cradle for infant health and safety.",address:{"@type":"PostalAddress",addressCountry:"IN"}},{"@context":"https://schema.org","@type":"WebSite","@id":"https://maatriva.co.in/#website",name:"Maatriva",url:"https://maatriva.co.in",description:"Smart Baby Care Powered by AI",publisher:{"@id":"https://maatriva.co.in/#organization"}},{"@context":"https://schema.org","@type":"Product",name:"Maatriva Smart Baby Cradle",image:"https://maatriva.co.in/AIPro.jpeg",description:"AI-powered smart baby cradle with real-time health monitoring and automated soothing.",brand:{"@type":"Brand",name:"Maatriva"},offers:{"@type":"AggregateOffer",priceCurrency:"INR",lowPrice:"12000",highPrice:"75000",offerCount:"3"}}])})]}),e.jsx(I,{}),e.jsxs(t.Suspense,{fallback:e.jsx("div",{className:"h-96"}),children:[e.jsx(N,{}),e.jsx(A,{}),e.jsx(P,{}),e.jsx(E,{}),e.jsx(S,{}),e.jsx(T,{})]})]})}export{O as default};

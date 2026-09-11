const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ModelCursor-Bvh1u8yd.js","assets/ui-vendor-avc6CE4D.js","assets/three-vendor-_GriAIux.js","assets/Diseases-DRJeQ6BJ.js","assets/index-I6rEm6Yf.js","assets/animation-vendor-C0VThzDd.js","assets/index-IC1qE06D.css","assets/theme-9jNYhsyy.css","assets/Feature-BwJjo_MV.js","assets/ScrollTrigger-Cv03IO65.js","assets/brain-C7eJeMjY.js","assets/smartphone-Cmua_er6.js","assets/shield-CNQCk_CS.js","assets/AppDownloadSection-Cq33dGQy.js","assets/shield-check-9GnshqRP.js","assets/circle-check-hNyvDkVF.js","assets/zap-MhLBiDod.js","assets/howItWorks-4EnvB9Gw.js","assets/ParentStories-B_HmuWo7.js","assets/withParents-BF7nIKP-.js","assets/supportingParents-B3BGfIJp.js","assets/heart-Cmcg2vGB.js","assets/star-CMXx7w4R.js","assets/baby-Di8AXYwE.js","assets/ParentStories-BIkx6xJx.css","assets/SupportingParents-D5tP2JW9.js","assets/chevron-up-Ce2_R3eg.js","assets/trending-up-Ci04k2Js.js","assets/check-BN4VoxK7.js","assets/Pricing-Ceakq51m.js"])))=>i.map(i=>d[i]);
import{m as i,S as g,L as b,_ as r,H as f}from"./index-I6rEm6Yf.js";import{j as e,r as t}from"./ui-vendor-avc6CE4D.js";import{_ as u}from"./animation-vendor-C0VThzDd.js";function j({headingRef:a,badge:n,title:s,description:o,buttonText:l}){return e.jsxs("div",{children:[e.jsxs(i.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6},className:`
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-(--primary)
          mb-6
        `,children:[e.jsx(g,{size:16,className:"text-(--primary)"}),e.jsx("span",{className:"text-sm text-(--text-dark)",children:n})]}),e.jsxs("h1",{ref:a,className:`
          text-5xl
          md:text-6xl
          lg:text-7xl
          font-bold
          leading-tight
          text-(--text-dark)
        `,children:[s.first,e.jsx("br",{}),e.jsx("span",{className:"text-(--primary)",children:s.second})]}),e.jsx(i.p,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.4},className:`
          mt-6
          text-lg
          md:text-xl
          leading-relaxed
          max-w-xl
          text-(--text-dark)
        `,children:o}),e.jsx(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6},className:"flex flex-wrap gap-4 mt-8",children:e.jsx(b,{to:"/survey",className:"clay-btn clay-btn-primary px-8 py-4 text-base sm:text-lg font-bold inline-flex items-center justify-center cursor-pointer shadow-lg shadow-[#5A78D6]/25 transition-all duration-300",children:l||"Survey"})})]})}const v=t.lazy(()=>r(()=>import("./ModelCursor-Bvh1u8yd.js"),__vite__mapDeps([0,1,2])));function w(){return e.jsxs(i.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:1,ease:"easeOut"},className:`\r
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
        `}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx(i.div,{animate:{y:[-10,10,-10]},transition:{duration:5,repeat:1/0,ease:"easeInOut"},className:"w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] flex items-center justify-center",children:e.jsx(t.Suspense,{fallback:e.jsx("div",{className:"w-12 h-12 border-4 border-(--primary) border-t-transparent rounded-full animate-spin"}),children:e.jsx(v,{})})})})]})}function _(a){t.useEffect(()=>{const n=a.current;if(!n)return;const s=n.innerHTML,o=[],l=document.createTreeWalker(n,NodeFilter.SHOW_TEXT,null),x=[];for(;l.nextNode();)x.push(l.currentNode);return x.forEach(p=>{const y=p.nodeValue||"",m=document.createDocumentFragment();[...y].forEach(h=>{if(h===" "){m.appendChild(document.createTextNode(" "));return}const c=document.createElement("span");c.textContent=h,c.style.display="inline-block",m.appendChild(c),o.push(c)}),p.parentNode.replaceChild(m,p)}),u.from(o,{scale:0,y:50,rotation:()=>u.utils.random(-20,20),stagger:{each:.03,from:"random"},duration:.5,ease:"back.out(2)"}),()=>{n.innerHTML=s}},[a])}const d={badge:"AI Powered Baby Care",title:{first:"Sleep Better,",second:"Parent Smarter"},description:"The world's first AI-powered smart cradle that learns your baby's needs, automates soothing routines, and provides peace of mind for every parent.",buttonText:"Survey"};function A(){const a=t.useRef(null);return _(a),e.jsxs("section",{id:"home",className:"relative min-h-screen overflow-hidden clay-hero",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute top-20 left-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full"}),e.jsx("div",{className:"absolute bottom-10 right-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full"})]}),e.jsx("div",{className:"absolute inset-0 opacity-5",style:{backgroundImage:`
          linear-gradient(to right, var(--primary) 1px, transparent 1px),
          linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
        `,backgroundSize:"60px 60px"}}),e.jsx("div",{className:"relative z-10 max-w-7xl mx-auto px-6",children:e.jsxs("div",{className:"grid lg:grid-cols-2 items-center min-h-screen gap-12 lg:gap-16 pt-32 pb-16 lg:pt-24 lg:pb-12",children:[e.jsx(j,{headingRef:a,badge:d.badge,title:d.title,description:d.description,buttonText:d.buttonText}),e.jsx(w,{})]})})]})}const I=t.lazy(()=>r(()=>import("./Diseases-DRJeQ6BJ.js"),__vite__mapDeps([3,1,4,5,6,7]))),N=t.lazy(()=>r(()=>import("./Feature-BwJjo_MV.js"),__vite__mapDeps([8,1,4,5,6,9,10,11,12]))),E=t.lazy(()=>r(()=>import("./AppDownloadSection-Cq33dGQy.js"),__vite__mapDeps([13,1,4,5,6,11,14,15,16]))),P=t.lazy(()=>r(()=>import("./howItWorks-4EnvB9Gw.js"),__vite__mapDeps([17,1,4,5,6,9,16,15]))),S=t.lazy(()=>r(()=>import("./ParentStories-B_HmuWo7.js").then(a=>a.P),__vite__mapDeps([18,4,1,5,6,19,20,21,22,23,24]))),T=t.lazy(()=>r(()=>import("./SupportingParents-D5tP2JW9.js"),__vite__mapDeps([25,1,20,4,5,6,26,21,27,23,28]))),M=t.lazy(()=>r(()=>import("./Pricing-Ceakq51m.js"),__vite__mapDeps([29,4,1,5,6,28])));function z(){return e.jsxs("div",{className:"relative bg-(--bg) text-(--text) fade-in",children:[e.jsxs(f,{children:[e.jsx("title",{children:"Maatriva | Smart Baby Care Powered by AI"}),e.jsx("meta",{name:"description",content:"Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and newborn health monitoring."}),e.jsx("meta",{name:"keywords",content:"smart cradle, infant monitoring, AI baby care, healthcare technology, newborn monitoring, baby safety, parent assistance"}),e.jsx("link",{rel:"canonical",href:"https://maatriva.co.in/"}),e.jsx("meta",{property:"og:title",content:"Maatriva | Smart Baby Care Powered by AI"}),e.jsx("meta",{property:"og:description",content:"Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and newborn health monitoring."}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:url",content:"https://maatriva.co.in/"}),e.jsx("meta",{property:"og:image",content:"https://maatriva.co.in/AIPro.jpeg"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:title",content:"Maatriva | Smart Baby Care Powered by AI"}),e.jsx("meta",{name:"twitter:description",content:"Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and newborn health monitoring."}),e.jsx("meta",{name:"twitter:image",content:"https://maatriva.co.in/AIPro.jpeg"}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify([{"@context":"https://schema.org","@type":"MedicalOrganization","@id":"https://maatriva.co.in/#organization",name:"Maatriva",url:"https://maatriva.co.in",logo:"https://maatriva.co.in/android-chrome-512x512.png",image:"https://maatriva.co.in/AIPro.jpeg",description:"Maatriva is an innovative MedTech startup in India building the world's first AI-powered smart baby cradle for infant health and safety.",address:{"@type":"PostalAddress",addressCountry:"IN"}},{"@context":"https://schema.org","@type":"WebSite","@id":"https://maatriva.co.in/#website",name:"Maatriva",url:"https://maatriva.co.in",description:"Smart Baby Care Powered by AI",publisher:{"@id":"https://maatriva.co.in/#organization"}},{"@context":"https://schema.org","@type":"Product",name:"Maatriva Smart Baby Cradle",image:"https://maatriva.co.in/AIPro.jpeg",description:"AI-powered smart baby cradle with real-time health monitoring and automated soothing.",brand:{"@type":"Brand",name:"Maatriva"},offers:{"@type":"AggregateOffer",priceCurrency:"INR",lowPrice:"12000",highPrice:"75000",offerCount:"3"}}])})]}),e.jsx(A,{}),e.jsxs(t.Suspense,{fallback:e.jsx("div",{className:"h-96"}),children:[e.jsx(I,{}),e.jsx(N,{}),e.jsx(E,{}),e.jsx(P,{}),e.jsx(S,{}),e.jsx(T,{}),e.jsx(M,{})]})]})}export{z as default};

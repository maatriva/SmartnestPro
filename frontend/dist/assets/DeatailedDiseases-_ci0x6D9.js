import{j as e,r as l,c as y}from"./ui-vendor-avc6CE4D.js";import{c as g,L as b,m as p,A as v,X as j,h as w,a as N,H as k}from"./index-c2SW6ECx.js";import{A as _}from"./arrow-left-CIdS5PaS.js";import{S as f}from"./shield-check-FVntKGkp.js";import{A as u}from"./activity-DrUK7Txo.js";import{H as D}from"./heart-CzqaKAQG.js";import{W as S}from"./wind-Dn_sZfag.js";import{a as E}from"./index-DtCRqfIo.js";import"./animation-vendor-C-zae5Jp.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]],C=g("brain",M);function L({value:t,onChange:a}){return e.jsx("input",{type:"text",placeholder:"SEARCH...",value:t,onChange:i=>a(i.target.value),className:`\r
        w-full\r
        mt-6\r
        px-6\r
        py-4\r
        clay-input\r
        text-lg\r
        font-semibold\r
        outline-none\r
      `})}function I({searchQuery:t,setSearchQuery:a}){return e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:"max-w-7xl mx-auto px-8 py-8 flex justify-between items-center",children:[e.jsxs(b,{to:"/",className:"flex items-center gap-2 clay-btn clay-btn-secondary px-5 py-2 text-sm",children:[e.jsx(_,{className:"w-4 h-4"}),e.jsx("span",{className:"hidden sm:inline",children:"Back to Home"})]}),e.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 clay-badge text-[10px] sm:text-xs font-black",children:[e.jsx(f,{className:"w-4 h-4 text-(--primary)"}),"Clinical Protocol v2.4"]})]}),e.jsxs("header",{className:"registry-header max-w-4xl mx-auto px-6 text-center",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl md:text-5xl font-black mb-6 uppercase text-(--text-dark)",children:"Monitoring Registry"}),e.jsx(L,{value:t,onChange:a})]})]})}function A({name:t,icon:a,onSelect:i}){return e.jsx(p.div,{role:"button",tabIndex:0,"aria-label":`View details for ${t}`,onClick:i,onKeyDown:n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),i())},className:"clay-card p-6 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-(--primary-light)/50",whileHover:{y:-4},whileTap:{scale:.98},children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:`\r
            w-10\r
            h-10\r
            clay-badge\r
            text-(--primary)\r
            flex\r
            items-center\r
            justify-center\r
            shrink-0\r
            group-hover:scale-110\r
            transition-transform\r
          `,children:a}),e.jsxs("div",{className:"text-left",children:[e.jsx("h3",{className:`\r
              font-bold\r
              text-(--text-dark)\r
              leading-tight\r
              group-hover:text-(--primary)\r
              transition-colors\r
              line-clamp-2\r
            `,children:t}),e.jsx("p",{className:`\r
              text-xs\r
              text-(--text-light)\r
              mt-2\r
              font-bold\r
              tracking-wide\r
              uppercase\r
            `,children:"CLICK FOR DETAILS"})]})]})})}const h=t=>{if(!t)return e.jsx(u,{className:"w-5 h-5"});const a=t.toLowerCase();return a.includes("cardiac")||a.includes("parental")?e.jsx(D,{className:"w-5 h-5"}):a.includes("respiratory")||a.includes("sleep")?e.jsx(S,{className:"w-5 h-5"}):a.includes("neuro")?e.jsx(C,{className:"w-5 h-5"}):a.includes("infection")||a.includes("sepsis")?e.jsx(f,{className:"w-5 h-5"}):e.jsx(u,{className:"w-5 h-5"})};function B({section:t,onSelect:a}){const i=t.category.toLowerCase().replace(/[^a-z0-9]/g,"-");return e.jsxs("section",{id:i,className:"relative overflow-hidden mb-20 p-6 sm:p-8 md:p-10 rounded-[32px] clay-hero border-2 border-white/80 shadow-[0_20px_50px_rgba(103,210,218,0.3)]",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[e.jsx("div",{className:"absolute top-20 left-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full"}),e.jsx("div",{className:"absolute bottom-10 right-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full"})]}),e.jsx("div",{className:"absolute inset-0 opacity-5 pointer-events-none",style:{backgroundImage:`
          linear-gradient(to right, var(--primary) 1px, transparent 1px),
          linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
        `,backgroundSize:"60px 60px"}}),e.jsxs("div",{className:"relative z-10",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-8",children:[e.jsx("div",{className:"clay-badge p-3 bg-white/60",children:h(t.category)}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl md:text-3xl font-black text-(--text-dark)",children:t.category}),e.jsxs("p",{className:"text-(--text-light) font-bold text-sm",children:[t.diseases.length," conditions monitored"]})]})]}),e.jsx("div",{className:`\r
            grid\r
            grid-cols-1\r
            md:grid-cols-2\r
            lg:grid-cols-3\r
            gap-6\r
          `,children:t.diseases.map(n=>e.jsx(A,{name:n.name,icon:h(t.category),onSelect:()=>a(n)},n.id||n.name))})]})]})}function R({selected:t,onClose:a}){const i=l.useRef(null),n=l.useRef(null);l.useEffect(()=>{if(!t)return;const s=r=>{if(r.key==="Escape"&&a(),r.key==="Tab"){const o=i.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(o&&o.length>0){const c=o[0],m=o[o.length-1];r.shiftKey?document.activeElement===c&&(m.focus(),r.preventDefault()):document.activeElement===m&&(c.focus(),r.preventDefault())}}};return window.addEventListener("keydown",s),document.body.style.overflow="hidden",setTimeout(()=>{n.current?.focus()},100),()=>{window.removeEventListener("keydown",s),document.body.style.overflow=""}},[t,a]);const d=e.jsx(v,{children:t&&e.jsxs("div",{className:"fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto",role:"dialog","aria-modal":"true","aria-labelledby":"disease-modal-title",children:[e.jsx(p.div,{className:"absolute inset-0 bg-black/60",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:a}),e.jsxs(p.div,{ref:i,className:"clay-card p-6 sm:p-10 max-w-xl w-full relative z-10 text-(--text) bg-white my-auto",initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},children:[e.jsx("button",{ref:n,onClick:a,"aria-label":"Close modal",className:`
                absolute
                top-4
                right-4
                text-(--text-light)
                hover:text-(--primary)
                transition-colors
                p-2
                hover:bg-(--bg-hover)
                rounded-full
                focus:outline-none
                focus:ring-2
                focus:ring-(--primary-light)/50
              `,children:e.jsx(j,{className:"w-5 h-5"})}),e.jsx("h2",{id:"disease-modal-title",className:"text-3xl font-black mb-6 text-(--text-dark)",children:t.name}),e.jsx("p",{className:"mb-4 font-semibold text-lg",children:t.description}),e.jsx("p",{className:"italic text-(--text-light) font-medium",children:t.aiRole})]})]})});return y.createPortal(d,document.body)}function z(){return e.jsx("div",{className:"min-h-screen flex items-center justify-center",children:e.jsx(w,{})})}function q({categories:t}){const[a,i]=l.useState(""),n=l.useMemo(()=>t.map(s=>({id:s.toLowerCase().replace(/[^a-z0-9]/g,"-"),label:s})),[t]);l.useEffect(()=>{let s=!1;const r=()=>{s||(window.requestAnimationFrame(()=>{let o="";n.forEach(c=>{const m=document.getElementById(c.id);if(!m)return;const x=m.getBoundingClientRect();x.top<=200&&x.bottom>=200&&(o=c.id)}),o&&i(o),s=!1}),s=!0)};return window.addEventListener("scroll",r,{passive:!0}),r(),()=>window.removeEventListener("scroll",r)},[n]);function d(s){const r=document.getElementById(s);r&&r.scrollIntoView({behavior:"smooth",block:"start"})}return e.jsx("aside",{className:"fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block pointer-events-none",children:e.jsx("div",{className:"clay-card px-3 py-4 max-h-[70vh] overflow-y-auto pointer-events-auto",children:e.jsx("div",{className:"flex flex-col items-center gap-4",children:n.map(s=>{const r=a===s.id;return e.jsx(E,{children:e.jsx("button",{onClick:()=>d(s.id),className:"focus:outline-none cursor-pointer focus:ring-2 focus:ring-(--primary-light)/80 rounded-full p-0.5",title:s.label,"aria-label":`Scroll to category: ${s.label}`,"aria-current":r?"true":"false",children:e.jsx("span",{className:`rounded-full block transition-all duration-300 ${r?"w-4 h-4 bg-(--primary) shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),_inset_-2px_-2px_4px_rgba(0,0,0,0.2),_0_4px_8px_rgba(74,111,165,0.3)]":"w-2.5 h-2.5 bg-(--text-light) hover:bg-(--primary) shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),_inset_-1px_-1px_2px_rgba(0,0,0,0.15)]"}`})})},s.id)})})})})}const H=async()=>(await N.get("/diseases")).data;function F(){const[t,a]=l.useState([]),[i,n]=l.useState(!0),[d,s]=l.useState(null);return l.useEffect(()=>{(async()=>{try{const o=await H();a(o||[])}catch(o){console.error("Failed to fetch diseases:",o)}finally{n(!1)}})()},[]),{diseaseData:t,loading:i,selected:d,setSelected:s}}function P(t){const[a,i]=l.useState(""),n=l.useMemo(()=>{if(!a.trim())return t;const d=a.toLowerCase();return t.map(s=>({...s,diseases:s.diseases.filter(r=>r.name.toLowerCase().includes(d))})).filter(s=>s.diseases.length>0)},[a,t]);return{searchQuery:a,setSearchQuery:i,filteredData:n}}function X(){const{diseaseData:t,loading:a,selected:i,setSelected:n}=F(),{searchQuery:d,setSearchQuery:s,filteredData:r}=P(t);if(a)return e.jsx(z,{});const o=r.map(c=>c.category);return e.jsxs("main",{className:`\r
        min-h-screen\r
        bg-(--bg)\r
        text-(--text)\r
        pt-32\r
        pb-20\r
      `,children:[e.jsxs(k,{children:[e.jsx("title",{children:"Baby Disease Information | Maatriva"}),e.jsx("meta",{name:"description",content:"Explore Maatriva's clinical registry detailing common infant wellness risks, pediatric diseases, warning indicators, and preventive baby care advice."}),e.jsx("meta",{name:"keywords",content:"infant disease registry, baby health indicators, pediatric symptoms, baby wellness database, Maatriva"}),e.jsx("link",{rel:"canonical",href:"https://maatriva.co.in/diseases"}),e.jsx("meta",{property:"og:title",content:"Baby Disease Information | Maatriva"}),e.jsx("meta",{property:"og:description",content:"Explore Maatriva's clinical registry detailing common infant wellness risks, pediatric diseases, warning indicators, and preventive baby care advice."}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:url",content:"https://maatriva.co.in/diseases"}),e.jsx("meta",{property:"og:image",content:"https://maatriva.co.in/BasicCradle.jpeg"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:title",content:"Baby Disease Information | Maatriva"}),e.jsx("meta",{name:"twitter:description",content:"Explore Maatriva's clinical registry detailing common infant wellness risks, pediatric diseases, warning indicators, and preventive baby care advice."}),e.jsx("meta",{name:"twitter:image",content:"https://maatriva.co.in/BasicCradle.jpeg"}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"MedicalWebPage",name:"Baby Disease Information Registry - Maatriva",description:"Explore pediatric information on common infant wellness risks and preventive care guidance.",publisher:{"@type":"MedicalOrganization",name:"Maatriva",logo:"https://maatriva.co.in/android-chrome-512x512.png"}})})]}),e.jsx(q,{categories:o}),e.jsx(I,{searchQuery:d,setSearchQuery:s}),e.jsx("div",{className:"max-w-7xl mx-auto px-6 mt-16",children:r.map(c=>e.jsx(B,{section:c,onSelect:n},c.category))}),e.jsx(R,{selected:i,onClose:()=>n(null)})]})}export{X as default};

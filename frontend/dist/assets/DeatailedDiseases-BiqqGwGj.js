import{j as e,r as l,c as y}from"./ui-vendor-avc6CE4D.js";/* empty css              */import{c as f,L as b,m as p,b as v,X as j,h as w,A as N,H as k}from"./index-nS_xdxj7.js";import{A as _}from"./arrow-left-Cg2aWq8_.js";import{H as D}from"./heart-VnLn229a.js";import{W as E}from"./wind-Bbx9DoPf.js";import{B as S}from"./brain-LPK7AR0h.js";import{a as C}from"./index-DtCRqfIo.js";import"./animation-vendor-C0VThzDd.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],u=f("activity",L);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],g=f("shield-check",I);function M({value:t,onChange:a}){return e.jsx("input",{type:"text",placeholder:"SEARCH...",value:t,onChange:i=>a(i.target.value),className:`\r
        w-full\r
        mt-6\r
        px-6\r
        py-4\r
        clay-input\r
        text-lg\r
        font-semibold\r
        outline-none\r
      `})}function B({searchQuery:t,setSearchQuery:a}){return e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:"max-w-7xl mx-auto px-8 py-8 flex justify-between items-center",children:[e.jsxs(b,{to:"/",className:"flex items-center gap-2 clay-btn clay-btn-secondary px-5 py-2 text-sm",children:[e.jsx(_,{className:"w-4 h-4"}),e.jsx("span",{className:"hidden sm:inline",children:"Back to Home"})]}),e.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 clay-badge text-[10px] sm:text-xs font-black",children:[e.jsx(g,{className:"w-4 h-4 text-(--primary)"}),"Clinical Protocol v2.4"]})]}),e.jsxs("header",{className:"registry-header max-w-4xl mx-auto px-6 text-center",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl md:text-5xl font-black mb-6 uppercase text-(--text-dark)",children:"Monitoring Registry"}),e.jsx(M,{value:t,onChange:a})]})]})}function A({name:t,icon:a,onSelect:i}){return e.jsx(p.div,{role:"button",tabIndex:0,"aria-label":`View details for ${t}`,onClick:i,onKeyDown:n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),i())},className:"clay-card p-6 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-(--primary-light)/50",whileHover:{y:-4},whileTap:{scale:.98},children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:`\r
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
            `,children:"CLICK FOR DETAILS"})]})]})})}const h=t=>{if(!t)return e.jsx(u,{className:"w-5 h-5"});const a=t.toLowerCase();return a.includes("cardiac")||a.includes("parental")?e.jsx(D,{className:"w-5 h-5"}):a.includes("respiratory")||a.includes("sleep")?e.jsx(E,{className:"w-5 h-5"}):a.includes("neuro")?e.jsx(S,{className:"w-5 h-5"}):a.includes("infection")||a.includes("sepsis")?e.jsx(g,{className:"w-5 h-5"}):e.jsx(u,{className:"w-5 h-5"})};function R({section:t,onSelect:a}){const i=t.category.toLowerCase().replace(/[^a-z0-9]/g,"-");return e.jsxs("section",{id:i,className:"relative overflow-hidden mb-20 p-6 sm:p-8 md:p-10 rounded-[32px] clay-hero border-2 border-white/80 shadow-[0_20px_50px_rgba(103,210,218,0.3)]",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[e.jsx("div",{className:"absolute top-20 left-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full"}),e.jsx("div",{className:"absolute bottom-10 right-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full"})]}),e.jsx("div",{className:"absolute inset-0 opacity-5 pointer-events-none",style:{backgroundImage:`
          linear-gradient(to right, var(--primary) 1px, transparent 1px),
          linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
        `,backgroundSize:"60px 60px"}}),e.jsxs("div",{className:"relative z-10",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-8",children:[e.jsx("div",{className:"clay-badge p-3 bg-white/60",children:h(t.category)}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl md:text-3xl font-black text-(--text-dark)",children:t.category}),e.jsxs("p",{className:"text-(--text-light) font-bold text-sm",children:[t.diseases.length," conditions monitored"]})]})]}),e.jsx("div",{className:`\r
            grid\r
            grid-cols-1\r
            md:grid-cols-2\r
            lg:grid-cols-3\r
            gap-6\r
          `,children:t.diseases.map(n=>e.jsx(A,{name:n.name,icon:h(t.category),onSelect:()=>a(n)},n.id||n.name))})]})]})}function z({selected:t,onClose:a}){const i=l.useRef(null),n=l.useRef(null);l.useEffect(()=>{if(!t)return;const s=r=>{if(r.key==="Escape"&&a(),r.key==="Tab"){const o=i.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(o&&o.length>0){const c=o[0],m=o[o.length-1];r.shiftKey?document.activeElement===c&&(m.focus(),r.preventDefault()):document.activeElement===m&&(c.focus(),r.preventDefault())}}};return window.addEventListener("keydown",s),document.body.style.overflow="hidden",setTimeout(()=>{n.current?.focus()},100),()=>{window.removeEventListener("keydown",s),document.body.style.overflow=""}},[t,a]);const d=e.jsx(v,{children:t&&e.jsxs("div",{className:"fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto",role:"dialog","aria-modal":"true","aria-labelledby":"disease-modal-title",children:[e.jsx(p.div,{className:"absolute inset-0 bg-black/60",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:a}),e.jsxs(p.div,{ref:i,className:"clay-card p-6 sm:p-10 max-w-xl w-full relative z-10 text-(--text) bg-white my-auto",initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},children:[e.jsx("button",{ref:n,onClick:a,"aria-label":"Close modal",className:`
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
              `,children:e.jsx(j,{className:"w-5 h-5"})}),e.jsx("h2",{id:"disease-modal-title",className:"text-3xl font-black mb-6 text-(--text-dark)",children:t.name}),e.jsx("p",{className:"mb-4 font-semibold text-lg",children:t.description}),e.jsx("p",{className:"italic text-(--text-light) font-medium",children:t.aiRole})]})]})});return y.createPortal(d,document.body)}function H(){return e.jsx("div",{className:"min-h-screen flex items-center justify-center",children:e.jsx(w,{})})}function F({categories:t}){const[a,i]=l.useState(""),n=l.useMemo(()=>t.map(s=>({id:s.toLowerCase().replace(/[^a-z0-9]/g,"-"),label:s})),[t]);l.useEffect(()=>{let s=!1;const r=()=>{s||(window.requestAnimationFrame(()=>{let o="";n.forEach(c=>{const m=document.getElementById(c.id);if(!m)return;const x=m.getBoundingClientRect();x.top<=200&&x.bottom>=200&&(o=c.id)}),o&&i(o),s=!1}),s=!0)};return window.addEventListener("scroll",r,{passive:!0}),r(),()=>window.removeEventListener("scroll",r)},[n]);function d(s){const r=document.getElementById(s);r&&r.scrollIntoView({behavior:"smooth",block:"start"})}return e.jsx("aside",{className:"fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block pointer-events-none",children:e.jsx("div",{className:"clay-card px-3 py-4 max-h-[70vh] overflow-y-auto pointer-events-auto",children:e.jsx("div",{className:"flex flex-col items-center gap-4",children:n.map(s=>{const r=a===s.id;return e.jsx(C,{children:e.jsx("button",{onClick:()=>d(s.id),className:"focus:outline-none cursor-pointer focus:ring-2 focus:ring-(--primary-light)/80 rounded-full p-0.5",title:s.label,"aria-label":`Scroll to category: ${s.label}`,"aria-current":r?"true":"false",children:e.jsx("span",{className:`rounded-full block transition-all duration-300 ${r?"w-4 h-4 bg-(--primary) shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),_inset_-2px_-2px_4px_rgba(0,0,0,0.2),_0_4px_8px_rgba(74,111,165,0.3)]":"w-2.5 h-2.5 bg-(--text-light) hover:bg-(--primary) shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),_inset_-1px_-1px_2px_rgba(0,0,0,0.15)]"}`})})},s.id)})})})})}const P=async()=>(await N.get("/diseases")).data;function T(){const[t,a]=l.useState([]),[i,n]=l.useState(!0),[d,s]=l.useState(null);return l.useEffect(()=>{(async()=>{try{const o=await P();a(o||[])}catch(o){console.error("Failed to fetch diseases:",o)}finally{n(!1)}})()},[]),{diseaseData:t,loading:i,selected:d,setSelected:s}}function K(t){const[a,i]=l.useState(""),n=l.useMemo(()=>{if(!a.trim())return t;const d=a.toLowerCase();return t.map(s=>({...s,diseases:s.diseases.filter(r=>r.name.toLowerCase().includes(d))})).filter(s=>s.diseases.length>0)},[a,t]);return{searchQuery:a,setSearchQuery:i,filteredData:n}}function U(){const{diseaseData:t,loading:a,selected:i,setSelected:n}=T(),{searchQuery:d,setSearchQuery:s,filteredData:r}=K(t);if(a)return e.jsx(H,{});const o=r.map(c=>c.category);return e.jsxs("main",{className:`\r
        min-h-screen\r
        bg-(--bg)\r
        text-(--text)\r
        pt-32\r
        pb-20\r
      `,children:[e.jsxs(k,{children:[e.jsx("title",{children:"Baby Disease Information | Maatriva"}),e.jsx("meta",{name:"description",content:"Explore Maatriva's clinical registry detailing common infant wellness risks, pediatric diseases, warning indicators, and preventive baby care advice."}),e.jsx("meta",{name:"keywords",content:"infant disease registry, baby health indicators, pediatric symptoms, baby wellness database, Maatriva"}),e.jsx("link",{rel:"canonical",href:"https://maatriva.vercel.app/diseases"}),e.jsx("meta",{property:"og:title",content:"Baby Disease Information | Maatriva"}),e.jsx("meta",{property:"og:description",content:"Explore Maatriva's clinical registry detailing common infant wellness risks, pediatric diseases, warning indicators, and preventive baby care advice."}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:url",content:"https://maatriva.vercel.app/diseases"}),e.jsx("meta",{property:"og:image",content:"https://maatriva.vercel.app/BasicCradle.jpeg"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:title",content:"Baby Disease Information | Maatriva"}),e.jsx("meta",{name:"twitter:description",content:"Explore Maatriva's clinical registry detailing common infant wellness risks, pediatric diseases, warning indicators, and preventive baby care advice."}),e.jsx("meta",{name:"twitter:image",content:"https://maatriva.vercel.app/BasicCradle.jpeg"}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"MedicalWebPage",name:"Baby Disease Information Registry - Maatriva",description:"Explore pediatric information on common infant wellness risks and preventive care guidance.",publisher:{"@type":"MedicalOrganization",name:"Maatriva",logo:"https://maatriva.vercel.app/android-chrome-512x512.png"}})})]}),e.jsx(F,{categories:o}),e.jsx(B,{searchQuery:d,setSearchQuery:s}),e.jsx("div",{className:"max-w-7xl mx-auto px-6 mt-16",children:r.map(c=>e.jsx(R,{section:c,onSelect:n},c.category))}),e.jsx(z,{selected:i,onClose:()=>n(null)})]})}export{U as default};

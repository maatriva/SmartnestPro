import{j as e,r as l}from"./ui-vendor-avc6CE4D.js";import{B as y}from"./theme-BLvKtsoM.js";import{A as j}from"./arrow-left-CAV1eSU5.js";import{c as f,L as b,m as x,a as N,X as v,A as w}from"./index-KpkQJGbx.js";import{H as k,W as _}from"./wind-DgV2SPiB.js";import{a as S}from"./index-DtCRqfIo.js";import"./animation-vendor-DvrN3zRt.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],p=f("activity",C);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],g=f("shield-check",D);function L({value:t,onChange:s}){return e.jsx("input",{type:"text",placeholder:"SEARCH...",value:t,onChange:i=>s(i.target.value),className:`\r
        w-full\r
        mt-6\r
        px-6\r
        py-4\r
        clay-input\r
        text-lg\r
        font-semibold\r
        outline-none\r
      `})}function A({searchQuery:t,setSearchQuery:s}){return e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:"max-w-7xl mx-auto px-8 py-8 flex justify-between items-center",children:[e.jsxs(b,{to:"/",className:"flex items-center gap-2 clay-btn clay-btn-secondary px-5 py-2 text-sm",children:[e.jsx(j,{className:"w-4 h-4"}),e.jsx("span",{className:"hidden sm:inline",children:"Back to Home"})]}),e.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 clay-badge text-[10px] sm:text-xs font-black",children:[e.jsx(g,{className:"w-4 h-4 text-(--primary)"}),"Clinical Protocol v2.4"]})]}),e.jsxs("header",{className:"registry-header max-w-4xl mx-auto px-6 text-center",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl md:text-5xl font-black mb-6 uppercase text-(--text-dark)",children:"Monitoring Registry"}),e.jsx(L,{value:t,onChange:s})]})]})}function E({name:t,icon:s,onSelect:i}){return e.jsx(x.div,{onClick:i,className:"clay-card p-6 cursor-pointer group",whileHover:{y:-4},whileTap:{scale:.98},children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:`\r
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
          `,children:s}),e.jsxs("div",{className:"text-left",children:[e.jsx("h3",{className:`\r
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
            `,children:"CLICK FOR DETAILS"})]})]})})}const h=t=>{if(!t)return e.jsx(p,{className:"w-5 h-5"});const s=t.toLowerCase();return s.includes("cardiac")||s.includes("parental")?e.jsx(k,{className:"w-5 h-5"}):s.includes("respiratory")||s.includes("sleep")?e.jsx(_,{className:"w-5 h-5"}):s.includes("neuro")?e.jsx(y,{className:"w-5 h-5"}):s.includes("infection")||s.includes("sepsis")?e.jsx(g,{className:"w-5 h-5"}):e.jsx(p,{className:"w-5 h-5"})};function I({section:t,onSelect:s}){const i=t.category.toLowerCase().replace(/[^a-z0-9]/g,"-");return e.jsxs("section",{id:i,className:"mb-20",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-8",children:[e.jsx("div",{className:"clay-badge p-3",children:h(t.category)}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl md:text-3xl font-black text-(--text-dark)",children:t.category}),e.jsxs("p",{className:"text-(--text-light)",children:[t.diseases.length," conditions monitored"]})]})]}),e.jsx("div",{className:`\r
          grid\r
          grid-cols-1\r
          md:grid-cols-2\r
          lg:grid-cols-3\r
          gap-6\r
        `,children:t.diseases.map(n=>e.jsx(E,{name:n.name,icon:h(t.category),onSelect:()=>s(n)},n.id||n.name))})]})}function z({selected:t,onClose:s}){return e.jsx(N,{children:t&&e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[e.jsx(x.div,{className:"absolute inset-0 bg-black/60",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:s}),e.jsxs(x.div,{className:"clay-card p-10 max-w-xl w-full relative z-10 text-(--text)",initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},children:[e.jsx("button",{onClick:s,className:`\r
                absolute\r
                top-4\r
                right-4\r
                text-(--text-light)\r
                hover:text-(--primary)\r
                transition-colors\r
                p-2\r
                hover:bg-(--bg-hover)\r
                rounded-full\r
              `,children:e.jsx(v,{className:"w-5 h-5"})}),e.jsx("h2",{className:"text-3xl font-black mb-6 text-(--text-dark)",children:t.name}),e.jsx("p",{className:"mb-4 font-semibold text-lg",children:t.description}),e.jsx("p",{className:"italic text-(--text-light) font-medium",children:t.aiRole})]})]})})}function H(){return e.jsx("div",{className:"min-h-screen flex items-center justify-center",children:e.jsx("div",{className:`\r
          w-12\r
          h-12\r
          border-4\r
          border-(--primary)\r
          border-t-transparent\r
          rounded-full\r
          animate-spin\r
        `})})}function R({categories:t}){const[s,i]=l.useState(""),n=l.useMemo(()=>t.map(r=>({id:r.toLowerCase().replace(/[^a-z0-9]/g,"-"),label:r})),[t]);l.useEffect(()=>{let r=!1;const a=()=>{r||(window.requestAnimationFrame(()=>{let c="";n.forEach(d=>{const m=document.getElementById(d.id);if(!m)return;const u=m.getBoundingClientRect();u.top<=200&&u.bottom>=200&&(c=d.id)}),c&&i(c),r=!1}),r=!0)};return window.addEventListener("scroll",a,{passive:!0}),a(),()=>window.removeEventListener("scroll",a)},[n]);function o(r){const a=document.getElementById(r);a&&a.scrollIntoView({behavior:"smooth",block:"start"})}return e.jsx("aside",{className:"fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block",children:e.jsx("div",{className:"clay-card px-3 py-4 max-h-[70vh] overflow-y-auto",children:e.jsx("div",{className:"flex flex-col items-center gap-4",children:n.map(r=>{const a=s===r.id;return e.jsx(S,{children:e.jsx("button",{onClick:()=>o(r.id),className:"focus:outline-none cursor-pointer",title:r.label,children:e.jsx("span",{className:`rounded-full block transition-all duration-300 ${a?"w-4 h-4 bg-(--primary) shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),_inset_-2px_-2px_4px_rgba(0,0,0,0.2),_0_4px_8px_rgba(74,111,165,0.3)]":"w-2.5 h-2.5 bg-(--text-light) hover:bg-(--primary) shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),_inset_-1px_-1px_2px_rgba(0,0,0,0.15)]"}`})})},r.id)})})})})}const B=async()=>(await w.get("/diseases")).data;function M(){const[t,s]=l.useState([]),[i,n]=l.useState(!0),[o,r]=l.useState(null);return l.useEffect(()=>{(async()=>{try{const c=await B();s(c||[])}catch(c){console.error("Failed to fetch diseases:",c)}finally{n(!1)}})()},[]),{diseaseData:t,loading:i,selected:o,setSelected:r}}function F(t){const[s,i]=l.useState(""),n=l.useMemo(()=>{if(!s.trim())return t;const o=s.toLowerCase();return t.map(r=>({...r,diseases:r.diseases.filter(a=>a.name.toLowerCase().includes(o))})).filter(r=>r.diseases.length>0)},[s,t]);return{searchQuery:s,setSearchQuery:i,filteredData:n}}function K(){const{diseaseData:t,loading:s,selected:i,setSelected:n}=M(),{searchQuery:o,setSearchQuery:r,filteredData:a}=F(t);if(s)return e.jsx(H,{});const c=a.map(d=>d.category);return e.jsxs("main",{className:`\r
        min-h-screen\r
        bg-(--bg)\r
        text-(--text)\r
        pb-20\r
      `,children:[e.jsx(R,{categories:c}),e.jsx(A,{searchQuery:o,setSearchQuery:r}),e.jsx("div",{className:"max-w-7xl mx-auto px-6 mt-16",children:a.map(d=>e.jsx(I,{section:d,onSelect:n},d.category))}),e.jsx(z,{selected:i,onClose:()=>n(null)})]})}export{K as default};

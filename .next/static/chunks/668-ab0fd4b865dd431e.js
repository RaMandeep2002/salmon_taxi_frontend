"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[668],{3610:(e,t,n)=>{n.d(t,{m:()=>r});function r(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),!1===n||!r.defaultPrevented)return t?.(r)}}},9741:(e,t,n)=>{n.d(t,{N:()=>s});var r=n(2115),l=n(8166),i=n(8068),o=n(2317),u=n(5155);function s(e){let t=e+"CollectionProvider",[n,s]=(0,l.A)(t),[a,c]=n(t,{collectionRef:{current:null},itemMap:new Map}),d=e=>{let{scope:t,children:n}=e,l=r.useRef(null),i=r.useRef(new Map).current;return(0,u.jsx)(a,{scope:t,itemMap:i,collectionRef:l,children:n})};d.displayName=t;let f=e+"CollectionSlot",v=r.forwardRef((e,t)=>{let{scope:n,children:r}=e,l=c(f,n),s=(0,i.s)(t,l.collectionRef);return(0,u.jsx)(o.DX,{ref:s,children:r})});v.displayName=f;let m=e+"CollectionItemSlot",p="data-radix-collection-item",y=r.forwardRef((e,t)=>{let{scope:n,children:l,...s}=e,a=r.useRef(null),d=(0,i.s)(t,a),f=c(m,n);return r.useEffect(()=>(f.itemMap.set(a,{ref:a,...s}),()=>void f.itemMap.delete(a))),(0,u.jsx)(o.DX,{[p]:"",ref:d,children:l})});return y.displayName=m,[{Provider:d,Slot:v,ItemSlot:y},function(t){let n=c(e+"CollectionConsumer",t);return r.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(p,"]")));return Array.from(n.itemMap.values()).sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current))},[n.collectionRef,n.itemMap])},s]}},8068:(e,t,n)=>{n.d(t,{s:()=>o,t:()=>i});var r=n(2115);function l(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}function i(...e){return t=>{let n=!1,r=e.map(e=>{let r=l(e,t);return n||"function"!=typeof r||(n=!0),r});if(n)return()=>{for(let t=0;t<r.length;t++){let n=r[t];"function"==typeof n?n():l(e[t],null)}}}}function o(...e){return r.useCallback(i(...e),e)}},8166:(e,t,n)=>{n.d(t,{A:()=>o,q:()=>i});var r=n(2115),l=n(5155);function i(e,t){let n=r.createContext(t),i=e=>{let{children:t,...i}=e,o=r.useMemo(()=>i,Object.values(i));return(0,l.jsx)(n.Provider,{value:o,children:t})};return i.displayName=e+"Provider",[i,function(l){let i=r.useContext(n);if(i)return i;if(void 0!==t)return t;throw Error(`\`${l}\` must be used within \`${e}\``)}]}function o(e,t=[]){let n=[],i=()=>{let t=n.map(e=>r.createContext(e));return function(n){let l=n?.[e]||t;return r.useMemo(()=>({[`__scope${e}`]:{...n,[e]:l}}),[n,l])}};return i.scopeName=e,[function(t,i){let o=r.createContext(i),u=n.length;n=[...n,i];let s=t=>{let{scope:n,children:i,...s}=t,a=n?.[e]?.[u]||o,c=r.useMemo(()=>s,Object.values(s));return(0,l.jsx)(a.Provider,{value:c,children:i})};return s.displayName=t+"Provider",[s,function(n,l){let s=l?.[e]?.[u]||o,a=r.useContext(s);if(a)return a;if(void 0!==i)return i;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let l=n.reduce((t,{useScope:n,scopeName:r})=>{let l=n(e)[`__scope${r}`];return{...t,...l}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:l}),[l])}};return n.scopeName=t.scopeName,n}(i,...t)]}},3741:(e,t,n)=>{n.d(t,{bL:()=>E,lg:()=>b,qW:()=>v});var r,l=n(2115),i=n(3610),o=n(3360),u=n(8068),s=n(1524),a=n(5630),c=n(5155),d="dismissableLayer.update",f=l.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),v=l.forwardRef((e,t)=>{var n,v;let{disableOutsidePointerEvents:m=!1,onEscapeKeyDown:E,onPointerDownOutside:b,onFocusOutside:N,onInteractOutside:h,onDismiss:w,...g}=e,C=l.useContext(f),[O,R]=l.useState(null),P=null!==(v=null==O?void 0:O.ownerDocument)&&void 0!==v?v:null===(n=globalThis)||void 0===n?void 0:n.document,[,D]=l.useState({}),x=(0,u.s)(t,e=>R(e)),M=Array.from(C.layers),[L]=[...C.layersWithOutsidePointerEventsDisabled].slice(-1),T=M.indexOf(L),j=O?M.indexOf(O):-1,S=C.layersWithOutsidePointerEventsDisabled.size>0,A=j>=T,k=function(e){var t;let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null===(t=globalThis)||void 0===t?void 0:t.document,r=(0,s.c)(e),i=l.useRef(!1),o=l.useRef(()=>{});return l.useEffect(()=>{let e=e=>{if(e.target&&!i.current){let t=function(){y("dismissableLayer.pointerDownOutside",r,l,{discrete:!0})},l={originalEvent:e};"touch"===e.pointerType?(n.removeEventListener("click",o.current),o.current=t,n.addEventListener("click",o.current,{once:!0})):t()}else n.removeEventListener("click",o.current);i.current=!1},t=window.setTimeout(()=>{n.addEventListener("pointerdown",e)},0);return()=>{window.clearTimeout(t),n.removeEventListener("pointerdown",e),n.removeEventListener("click",o.current)}},[n,r]),{onPointerDownCapture:()=>i.current=!0}}(e=>{let t=e.target,n=[...C.branches].some(e=>e.contains(t));!A||n||(null==b||b(e),null==h||h(e),e.defaultPrevented||null==w||w())},P),W=function(e){var t;let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null===(t=globalThis)||void 0===t?void 0:t.document,r=(0,s.c)(e),i=l.useRef(!1);return l.useEffect(()=>{let e=e=>{e.target&&!i.current&&y("dismissableLayer.focusOutside",r,{originalEvent:e},{discrete:!1})};return n.addEventListener("focusin",e),()=>n.removeEventListener("focusin",e)},[n,r]),{onFocusCapture:()=>i.current=!0,onBlurCapture:()=>i.current=!1}}(e=>{let t=e.target;[...C.branches].some(e=>e.contains(t))||(null==N||N(e),null==h||h(e),e.defaultPrevented||null==w||w())},P);return(0,a.U)(e=>{j!==C.layers.size-1||(null==E||E(e),!e.defaultPrevented&&w&&(e.preventDefault(),w()))},P),l.useEffect(()=>{if(O)return m&&(0===C.layersWithOutsidePointerEventsDisabled.size&&(r=P.body.style.pointerEvents,P.body.style.pointerEvents="none"),C.layersWithOutsidePointerEventsDisabled.add(O)),C.layers.add(O),p(),()=>{m&&1===C.layersWithOutsidePointerEventsDisabled.size&&(P.body.style.pointerEvents=r)}},[O,P,m,C]),l.useEffect(()=>()=>{O&&(C.layers.delete(O),C.layersWithOutsidePointerEventsDisabled.delete(O),p())},[O,C]),l.useEffect(()=>{let e=()=>D({});return document.addEventListener(d,e),()=>document.removeEventListener(d,e)},[]),(0,c.jsx)(o.sG.div,{...g,ref:x,style:{pointerEvents:S?A?"auto":"none":void 0,...e.style},onFocusCapture:(0,i.m)(e.onFocusCapture,W.onFocusCapture),onBlurCapture:(0,i.m)(e.onBlurCapture,W.onBlurCapture),onPointerDownCapture:(0,i.m)(e.onPointerDownCapture,k.onPointerDownCapture)})});v.displayName="DismissableLayer";var m=l.forwardRef((e,t)=>{let n=l.useContext(f),r=l.useRef(null),i=(0,u.s)(t,r);return l.useEffect(()=>{let e=r.current;if(e)return n.branches.add(e),()=>{n.branches.delete(e)}},[n.branches]),(0,c.jsx)(o.sG.div,{...e,ref:i})});function p(){let e=new CustomEvent(d);document.dispatchEvent(e)}function y(e,t,n,r){let{discrete:l}=r,i=n.originalEvent.target,u=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&i.addEventListener(e,t,{once:!0}),l?(0,o.hO)(i,u):i.dispatchEvent(u)}m.displayName="DismissableLayerBranch";var E=v,b=m},7323:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(2115),l=n(7650),i=n(3360),o=n(6611),u=n(5155),s=r.forwardRef((e,t)=>{var n,s;let{container:a,...c}=e,[d,f]=r.useState(!1);(0,o.N)(()=>f(!0),[]);let v=a||d&&(null===(s=globalThis)||void 0===s?void 0:null===(n=s.document)||void 0===n?void 0:n.body);return v?l.createPortal((0,u.jsx)(i.sG.div,{...c,ref:t}),v):null});s.displayName="Portal"},7028:(e,t,n)=>{n.d(t,{C:()=>o});var r=n(2115),l=n(8068),i=n(6611),o=e=>{let{present:t,children:n}=e,o=function(e){var t,n;let[l,o]=r.useState(),s=r.useRef({}),a=r.useRef(e),c=r.useRef("none"),[d,f]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},r.useReducer((e,t)=>{let r=n[e][t];return null!=r?r:e},t));return r.useEffect(()=>{let e=u(s.current);c.current="mounted"===d?e:"none"},[d]),(0,i.N)(()=>{let t=s.current,n=a.current;if(n!==e){let r=c.current,l=u(t);e?f("MOUNT"):"none"===l||(null==t?void 0:t.display)==="none"?f("UNMOUNT"):n&&r!==l?f("ANIMATION_OUT"):f("UNMOUNT"),a.current=e}},[e,f]),(0,i.N)(()=>{if(l){var e;let t;let n=null!==(e=l.ownerDocument.defaultView)&&void 0!==e?e:window,r=e=>{let r=u(s.current).includes(e.animationName);if(e.target===l&&r&&(f("ANIMATION_END"),!a.current)){let e=l.style.animationFillMode;l.style.animationFillMode="forwards",t=n.setTimeout(()=>{"forwards"===l.style.animationFillMode&&(l.style.animationFillMode=e)})}},i=e=>{e.target===l&&(c.current=u(s.current))};return l.addEventListener("animationstart",i),l.addEventListener("animationcancel",r),l.addEventListener("animationend",r),()=>{n.clearTimeout(t),l.removeEventListener("animationstart",i),l.removeEventListener("animationcancel",r),l.removeEventListener("animationend",r)}}f("ANIMATION_END")},[l,f]),{isPresent:["mounted","unmountSuspended"].includes(d),ref:r.useCallback(e=>{e&&(s.current=getComputedStyle(e)),o(e)},[])}}(t),s="function"==typeof n?n({present:o.isPresent}):r.Children.only(n),a=(0,l.s)(o.ref,function(e){var t,n;let r=null===(t=Object.getOwnPropertyDescriptor(e.props,"ref"))||void 0===t?void 0:t.get,l=r&&"isReactWarning"in r&&r.isReactWarning;return l?e.ref:(l=(r=null===(n=Object.getOwnPropertyDescriptor(e,"ref"))||void 0===n?void 0:n.get)&&"isReactWarning"in r&&r.isReactWarning)?e.props.ref:e.props.ref||e.ref}(s));return"function"==typeof n||o.isPresent?r.cloneElement(s,{ref:a}):null};function u(e){return(null==e?void 0:e.animationName)||"none"}o.displayName="Presence"},3360:(e,t,n)=>{n.d(t,{hO:()=>s,sG:()=>u});var r=n(2115),l=n(7650),i=n(2317),o=n(5155),u=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=r.forwardRef((e,n)=>{let{asChild:r,...l}=e,u=r?i.DX:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,o.jsx)(u,{...l,ref:n})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function s(e,t){e&&l.flushSync(()=>e.dispatchEvent(t))}},2317:(e,t,n)=>{n.d(t,{DX:()=>o,xV:()=>s});var r=n(2115),l=n(8068),i=n(5155),o=r.forwardRef((e,t)=>{let{children:n,...l}=e,o=r.Children.toArray(n),s=o.find(a);if(s){let e=s.props.children,n=o.map(t=>t!==s?t:r.Children.count(e)>1?r.Children.only(null):r.isValidElement(e)?e.props.children:null);return(0,i.jsx)(u,{...l,ref:t,children:r.isValidElement(e)?r.cloneElement(e,void 0,n):null})}return(0,i.jsx)(u,{...l,ref:t,children:n})});o.displayName="Slot";var u=r.forwardRef((e,t)=>{let{children:n,...i}=e;if(r.isValidElement(n)){let e=function(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(n=(t=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in t&&t.isReactWarning)?e.props.ref:e.props.ref||e.ref}(n);return r.cloneElement(n,{...function(e,t){let n={...t};for(let r in t){let l=e[r],i=t[r];/^on[A-Z]/.test(r)?l&&i?n[r]=(...e)=>{i(...e),l(...e)}:l&&(n[r]=l):"style"===r?n[r]={...l,...i}:"className"===r&&(n[r]=[l,i].filter(Boolean).join(" "))}return{...e,...n}}(i,n.props),ref:t?(0,l.t)(t,e):e})}return r.Children.count(n)>1?r.Children.only(null):null});u.displayName="SlotClone";var s=({children:e})=>(0,i.jsx)(i.Fragment,{children:e});function a(e){return r.isValidElement(e)&&e.type===s}},1524:(e,t,n)=>{n.d(t,{c:()=>l});var r=n(2115);function l(e){let t=r.useRef(e);return r.useEffect(()=>{t.current=e}),r.useMemo(()=>(...e)=>t.current?.(...e),[])}},1488:(e,t,n)=>{n.d(t,{i:()=>i});var r=n(2115),l=n(1524);function i({prop:e,defaultProp:t,onChange:n=()=>{}}){let[i,o]=function({defaultProp:e,onChange:t}){let n=r.useState(e),[i]=n,o=r.useRef(i),u=(0,l.c)(t);return r.useEffect(()=>{o.current!==i&&(u(i),o.current=i)},[i,o,u]),n}({defaultProp:t,onChange:n}),u=void 0!==e,s=u?e:i,a=(0,l.c)(n);return[s,r.useCallback(t=>{if(u){let n="function"==typeof t?t(e):t;n!==e&&a(n)}else o(t)},[u,e,o,a])]}},5630:(e,t,n)=>{n.d(t,{U:()=>i});var r=n(2115),l=n(1524);function i(e,t=globalThis?.document){let n=(0,l.c)(e);r.useEffect(()=>{let e=e=>{"Escape"===e.key&&n(e)};return t.addEventListener("keydown",e,{capture:!0}),()=>t.removeEventListener("keydown",e,{capture:!0})},[n,t])}},6611:(e,t,n)=>{n.d(t,{N:()=>l});var r=n(2115),l=globalThis?.document?r.useLayoutEffect:()=>{}},1027:(e,t,n)=>{n.d(t,{F:()=>o});var r=n(3463);let l=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,i=r.$,o=(e,t)=>n=>{var r;if((null==t?void 0:t.variants)==null)return i(e,null==n?void 0:n.class,null==n?void 0:n.className);let{variants:o,defaultVariants:u}=t,s=Object.keys(o).map(e=>{let t=null==n?void 0:n[e],r=null==u?void 0:u[e];if(null===t)return null;let i=l(t)||l(r);return o[e][i]}),a=n&&Object.entries(n).reduce((e,t)=>{let[n,r]=t;return void 0===r||(e[n]=r),e},{});return i(e,s,null==t?void 0:null===(r=t.compoundVariants)||void 0===r?void 0:r.reduce((e,t)=>{let{class:n,className:r,...l}=t;return Object.entries(l).every(e=>{let[t,n]=e;return Array.isArray(n)?n.includes({...u,...a}[t]):({...u,...a})[t]===n})?[...e,n,r]:e},[]),null==n?void 0:n.class,null==n?void 0:n.className)}}}]);
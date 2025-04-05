"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[287],{3197:(e,t,n)=>{n.d(t,{rc:()=>ex,ZD:()=>ew,UC:()=>eD,VY:()=>eR,hJ:()=>eE,ZL:()=>eb,bL:()=>ey,hE:()=>eC,l9:()=>eh});var r=n(2115),o=n(8166),l=n(8068),i=n(3610),a=n(7668),s=n(1488),u=n(3741),d=n(196),c=n(7323),f=n(7028),p=n(3360),v=n(2292),m=n(4065),g=n(5587),y=n(2317),h=n(5155),b="Dialog",[E,D]=(0,o.A)(b),[x,w]=E(b),C=e=>{let{__scopeDialog:t,children:n,open:o,defaultOpen:l,onOpenChange:i,modal:u=!0}=e,d=r.useRef(null),c=r.useRef(null),[f=!1,p]=(0,s.i)({prop:o,defaultProp:l,onChange:i});return(0,h.jsx)(x,{scope:t,triggerRef:d,contentRef:c,contentId:(0,a.B)(),titleId:(0,a.B)(),descriptionId:(0,a.B)(),open:f,onOpenChange:p,onOpenToggle:r.useCallback(()=>p(e=>!e),[p]),modal:u,children:n})};C.displayName=b;var R="DialogTrigger",j=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=w(R,n),a=(0,l.s)(t,o.triggerRef);return(0,h.jsx)(p.sG.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":z(o.open),...r,ref:a,onClick:(0,i.m)(e.onClick,o.onOpenToggle)})});j.displayName=R;var N="DialogPortal",[O,I]=E(N,{forceMount:void 0}),F=e=>{let{__scopeDialog:t,forceMount:n,children:o,container:l}=e,i=w(N,t);return(0,h.jsx)(O,{scope:t,forceMount:n,children:r.Children.map(o,e=>(0,h.jsx)(f.C,{present:n||i.open,children:(0,h.jsx)(c.Z,{asChild:!0,container:l,children:e})}))})};F.displayName=N;var P="DialogOverlay",A=r.forwardRef((e,t)=>{let n=I(P,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,l=w(P,e.__scopeDialog);return l.modal?(0,h.jsx)(f.C,{present:r||l.open,children:(0,h.jsx)(L,{...o,ref:t})}):null});A.displayName=P;var L=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=w(P,n);return(0,h.jsx)(m.A,{as:y.DX,allowPinchZoom:!0,shards:[o.contentRef],children:(0,h.jsx)(p.sG.div,{"data-state":z(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),T="DialogContent",k=r.forwardRef((e,t)=>{let n=I(T,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,l=w(T,e.__scopeDialog);return(0,h.jsx)(f.C,{present:r||l.open,children:l.modal?(0,h.jsx)(_,{...o,ref:t}):(0,h.jsx)(S,{...o,ref:t})})});k.displayName=T;var _=r.forwardRef((e,t)=>{let n=w(T,e.__scopeDialog),o=r.useRef(null),a=(0,l.s)(t,n.contentRef,o);return r.useEffect(()=>{let e=o.current;if(e)return(0,g.Eq)(e)},[]),(0,h.jsx)(M,{...e,ref:a,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,i.m)(e.onCloseAutoFocus,e=>{var t;e.preventDefault(),null===(t=n.triggerRef.current)||void 0===t||t.focus()}),onPointerDownOutside:(0,i.m)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey;(2===t.button||n)&&e.preventDefault()}),onFocusOutside:(0,i.m)(e.onFocusOutside,e=>e.preventDefault())})}),S=r.forwardRef((e,t)=>{let n=w(T,e.__scopeDialog),o=r.useRef(!1),l=r.useRef(!1);return(0,h.jsx)(M,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var r,i;null===(r=e.onCloseAutoFocus)||void 0===r||r.call(e,t),t.defaultPrevented||(o.current||null===(i=n.triggerRef.current)||void 0===i||i.focus(),t.preventDefault()),o.current=!1,l.current=!1},onInteractOutside:t=>{var r,i;null===(r=e.onInteractOutside)||void 0===r||r.call(e,t),t.defaultPrevented||(o.current=!0,"pointerdown"!==t.detail.originalEvent.type||(l.current=!0));let a=t.target;(null===(i=n.triggerRef.current)||void 0===i?void 0:i.contains(a))&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&l.current&&t.preventDefault()}})}),M=r.forwardRef((e,t)=>{let{__scopeDialog:n,trapFocus:o,onOpenAutoFocus:i,onCloseAutoFocus:a,...s}=e,c=w(T,n),f=r.useRef(null),p=(0,l.s)(t,f);return(0,v.Oh)(),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(d.n,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:i,onUnmountAutoFocus:a,children:(0,h.jsx)(u.qW,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":z(c.open),...s,ref:p,onDismiss:()=>c.onOpenChange(!1)})}),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Y,{titleId:c.titleId}),(0,h.jsx)(J,{contentRef:f,descriptionId:c.descriptionId})]})]})}),W="DialogTitle",B=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=w(W,n);return(0,h.jsx)(p.sG.h2,{id:o.titleId,...r,ref:t})});B.displayName=W;var V="DialogDescription",K=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=w(V,n);return(0,h.jsx)(p.sG.p,{id:o.descriptionId,...r,ref:t})});K.displayName=V;var q="DialogClose",U=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=w(q,n);return(0,h.jsx)(p.sG.button,{type:"button",...r,ref:t,onClick:(0,i.m)(e.onClick,()=>o.onOpenChange(!1))})});function z(e){return e?"open":"closed"}U.displayName=q;var Z="DialogTitleWarning",[G,H]=(0,o.q)(Z,{contentName:T,titleName:W,docsSlug:"dialog"}),Y=e=>{let{titleId:t}=e,n=H(Z),o="`".concat(n.contentName,"` requires a `").concat(n.titleName,"` for the component to be accessible for screen reader users.\n\nIf you want to hide the `").concat(n.titleName,"`, you can wrap it with our VisuallyHidden component.\n\nFor more information, see https://radix-ui.com/primitives/docs/components/").concat(n.docsSlug);return r.useEffect(()=>{t&&!document.getElementById(t)&&console.error(o)},[o,t]),null},J=e=>{let{contentRef:t,descriptionId:n}=e,o=H("DialogDescriptionWarning"),l="Warning: Missing `Description` or `aria-describedby={undefined}` for {".concat(o.contentName,"}.");return r.useEffect(()=>{var e;let r=null===(e=t.current)||void 0===e?void 0:e.getAttribute("aria-describedby");n&&r&&!document.getElementById(n)&&console.warn(l)},[l,t,n]),null},X="AlertDialog",[$,Q]=(0,o.A)(X,[D]),ee=D(),et=e=>{let{__scopeAlertDialog:t,...n}=e,r=ee(t);return(0,h.jsx)(C,{...r,...n,modal:!0})};et.displayName=X;var en=r.forwardRef((e,t)=>{let{__scopeAlertDialog:n,...r}=e,o=ee(n);return(0,h.jsx)(j,{...o,...r,ref:t})});en.displayName="AlertDialogTrigger";var er=e=>{let{__scopeAlertDialog:t,...n}=e,r=ee(t);return(0,h.jsx)(F,{...r,...n})};er.displayName="AlertDialogPortal";var eo=r.forwardRef((e,t)=>{let{__scopeAlertDialog:n,...r}=e,o=ee(n);return(0,h.jsx)(A,{...o,...r,ref:t})});eo.displayName="AlertDialogOverlay";var el="AlertDialogContent",[ei,ea]=$(el),es=r.forwardRef((e,t)=>{let{__scopeAlertDialog:n,children:o,...a}=e,s=ee(n),u=r.useRef(null),d=(0,l.s)(t,u),c=r.useRef(null);return(0,h.jsx)(G,{contentName:el,titleName:eu,docsSlug:"alert-dialog",children:(0,h.jsx)(ei,{scope:n,cancelRef:c,children:(0,h.jsxs)(k,{role:"alertdialog",...s,...a,ref:d,onOpenAutoFocus:(0,i.m)(a.onOpenAutoFocus,e=>{var t;e.preventDefault(),null===(t=c.current)||void 0===t||t.focus({preventScroll:!0})}),onPointerDownOutside:e=>e.preventDefault(),onInteractOutside:e=>e.preventDefault(),children:[(0,h.jsx)(y.xV,{children:o}),(0,h.jsx)(eg,{contentRef:u})]})})})});es.displayName=el;var eu="AlertDialogTitle",ed=r.forwardRef((e,t)=>{let{__scopeAlertDialog:n,...r}=e,o=ee(n);return(0,h.jsx)(B,{...o,...r,ref:t})});ed.displayName=eu;var ec="AlertDialogDescription",ef=r.forwardRef((e,t)=>{let{__scopeAlertDialog:n,...r}=e,o=ee(n);return(0,h.jsx)(K,{...o,...r,ref:t})});ef.displayName=ec;var ep=r.forwardRef((e,t)=>{let{__scopeAlertDialog:n,...r}=e,o=ee(n);return(0,h.jsx)(U,{...o,...r,ref:t})});ep.displayName="AlertDialogAction";var ev="AlertDialogCancel",em=r.forwardRef((e,t)=>{let{__scopeAlertDialog:n,...r}=e,{cancelRef:o}=ea(ev,n),i=ee(n),a=(0,l.s)(t,o);return(0,h.jsx)(U,{...i,...r,ref:a})});em.displayName=ev;var eg=e=>{let{contentRef:t}=e,n="`".concat(el,"` requires a description for the component to be accessible for screen reader users.\n\nYou can add a description to the `").concat(el,"` by passing a `").concat(ec,"` component as a child, which also benefits sighted users by adding visible context to the dialog.\n\nAlternatively, you can use your own component as a description by assigning it an `id` and passing the same value to the `aria-describedby` prop in `").concat(el,"`. If the description is confusing or duplicative for sighted users, you can use the `@radix-ui/react-visually-hidden` primitive as a wrapper around your description component.\n\nFor more information, see https://radix-ui.com/primitives/docs/components/alert-dialog");return r.useEffect(()=>{var e;document.getElementById(null===(e=t.current)||void 0===e?void 0:e.getAttribute("aria-describedby"))||console.warn(n)},[n,t]),null},ey=et,eh=en,eb=er,eE=eo,eD=es,ex=ep,ew=em,eC=ed,eR=ef},8146:(e,t,n)=>{n.d(t,{bm:()=>eC,UC:()=>eD,VY:()=>ew,hJ:()=>eE,ZL:()=>eb,bL:()=>ey,hE:()=>ex,l9:()=>eh});var r,o=n(2115),l=n(3610),i=n(8068),a=n(8166),s=n(7668),u=n(1488),d=n(7650),c=n(5155),f=o.forwardRef((e,t)=>{let{children:n,...r}=e,l=o.Children.toArray(n),i=l.find(m);if(i){let e=i.props.children,n=l.map(t=>t!==i?t:o.Children.count(e)>1?o.Children.only(null):o.isValidElement(e)?e.props.children:null);return(0,c.jsx)(p,{...r,ref:t,children:o.isValidElement(e)?o.cloneElement(e,void 0,n):null})}return(0,c.jsx)(p,{...r,ref:t,children:n})});f.displayName="Slot";var p=o.forwardRef((e,t)=>{let{children:n,...r}=e;if(o.isValidElement(n)){let e=function(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(n=(t=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in t&&t.isReactWarning)?e.props.ref:e.props.ref||e.ref}(n),l=function(e,t){let n={...t};for(let r in t){let o=e[r],l=t[r];/^on[A-Z]/.test(r)?o&&l?n[r]=(...e)=>{l(...e),o(...e)}:o&&(n[r]=o):"style"===r?n[r]={...o,...l}:"className"===r&&(n[r]=[o,l].filter(Boolean).join(" "))}return{...e,...n}}(r,n.props);return n.type!==o.Fragment&&(l.ref=t?(0,i.t)(t,e):e),o.cloneElement(n,l)}return o.Children.count(n)>1?o.Children.only(null):null});p.displayName="SlotClone";var v=({children:e})=>(0,c.jsx)(c.Fragment,{children:e});function m(e){return o.isValidElement(e)&&e.type===v}var g=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=o.forwardRef((e,n)=>{let{asChild:r,...o}=e,l=r?f:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,c.jsx)(l,{...o,ref:n})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{}),y=n(1524),h=n(5630),b="dismissableLayer.update",E=o.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),D=o.forwardRef((e,t)=>{var n,a;let{disableOutsidePointerEvents:s=!1,onEscapeKeyDown:u,onPointerDownOutside:d,onFocusOutside:f,onInteractOutside:p,onDismiss:v,...m}=e,D=o.useContext(E),[C,R]=o.useState(null),j=null!==(a=null==C?void 0:C.ownerDocument)&&void 0!==a?a:null===(n=globalThis)||void 0===n?void 0:n.document,[,N]=o.useState({}),O=(0,i.s)(t,e=>R(e)),I=Array.from(D.layers),[F]=[...D.layersWithOutsidePointerEventsDisabled].slice(-1),P=I.indexOf(F),A=C?I.indexOf(C):-1,L=D.layersWithOutsidePointerEventsDisabled.size>0,T=A>=P,k=function(e){var t;let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null===(t=globalThis)||void 0===t?void 0:t.document,r=(0,y.c)(e),l=o.useRef(!1),i=o.useRef(()=>{});return o.useEffect(()=>{let e=e=>{if(e.target&&!l.current){let t=function(){w("dismissableLayer.pointerDownOutside",r,o,{discrete:!0})},o={originalEvent:e};"touch"===e.pointerType?(n.removeEventListener("click",i.current),i.current=t,n.addEventListener("click",i.current,{once:!0})):t()}else n.removeEventListener("click",i.current);l.current=!1},t=window.setTimeout(()=>{n.addEventListener("pointerdown",e)},0);return()=>{window.clearTimeout(t),n.removeEventListener("pointerdown",e),n.removeEventListener("click",i.current)}},[n,r]),{onPointerDownCapture:()=>l.current=!0}}(e=>{let t=e.target,n=[...D.branches].some(e=>e.contains(t));!T||n||(null==d||d(e),null==p||p(e),e.defaultPrevented||null==v||v())},j),_=function(e){var t;let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null===(t=globalThis)||void 0===t?void 0:t.document,r=(0,y.c)(e),l=o.useRef(!1);return o.useEffect(()=>{let e=e=>{e.target&&!l.current&&w("dismissableLayer.focusOutside",r,{originalEvent:e},{discrete:!1})};return n.addEventListener("focusin",e),()=>n.removeEventListener("focusin",e)},[n,r]),{onFocusCapture:()=>l.current=!0,onBlurCapture:()=>l.current=!1}}(e=>{let t=e.target;[...D.branches].some(e=>e.contains(t))||(null==f||f(e),null==p||p(e),e.defaultPrevented||null==v||v())},j);return(0,h.U)(e=>{A!==D.layers.size-1||(null==u||u(e),!e.defaultPrevented&&v&&(e.preventDefault(),v()))},j),o.useEffect(()=>{if(C)return s&&(0===D.layersWithOutsidePointerEventsDisabled.size&&(r=j.body.style.pointerEvents,j.body.style.pointerEvents="none"),D.layersWithOutsidePointerEventsDisabled.add(C)),D.layers.add(C),x(),()=>{s&&1===D.layersWithOutsidePointerEventsDisabled.size&&(j.body.style.pointerEvents=r)}},[C,j,s,D]),o.useEffect(()=>()=>{C&&(D.layers.delete(C),D.layersWithOutsidePointerEventsDisabled.delete(C),x())},[C,D]),o.useEffect(()=>{let e=()=>N({});return document.addEventListener(b,e),()=>document.removeEventListener(b,e)},[]),(0,c.jsx)(g.div,{...m,ref:O,style:{pointerEvents:L?T?"auto":"none":void 0,...e.style},onFocusCapture:(0,l.m)(e.onFocusCapture,_.onFocusCapture),onBlurCapture:(0,l.m)(e.onBlurCapture,_.onBlurCapture),onPointerDownCapture:(0,l.m)(e.onPointerDownCapture,k.onPointerDownCapture)})});function x(){let e=new CustomEvent(b);document.dispatchEvent(e)}function w(e,t,n,r){let{discrete:o}=r,l=n.originalEvent.target,i=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});(t&&l.addEventListener(e,t,{once:!0}),o)?l&&d.flushSync(()=>l.dispatchEvent(i)):l.dispatchEvent(i)}D.displayName="DismissableLayer",o.forwardRef((e,t)=>{let n=o.useContext(E),r=o.useRef(null),l=(0,i.s)(t,r);return o.useEffect(()=>{let e=r.current;if(e)return n.branches.add(e),()=>{n.branches.delete(e)}},[n.branches]),(0,c.jsx)(g.div,{...e,ref:l})}).displayName="DismissableLayerBranch";var C="focusScope.autoFocusOnMount",R="focusScope.autoFocusOnUnmount",j={bubbles:!1,cancelable:!0},N=o.forwardRef((e,t)=>{let{loop:n=!1,trapped:r=!1,onMountAutoFocus:l,onUnmountAutoFocus:a,...s}=e,[u,d]=o.useState(null),f=(0,y.c)(l),p=(0,y.c)(a),v=o.useRef(null),m=(0,i.s)(t,e=>d(e)),h=o.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;o.useEffect(()=>{if(r){let e=function(e){if(h.paused||!u)return;let t=e.target;u.contains(t)?v.current=t:F(v.current,{select:!0})},t=function(e){if(h.paused||!u)return;let t=e.relatedTarget;null===t||u.contains(t)||F(v.current,{select:!0})};document.addEventListener("focusin",e),document.addEventListener("focusout",t);let n=new MutationObserver(function(e){if(document.activeElement===document.body)for(let t of e)t.removedNodes.length>0&&F(u)});return u&&n.observe(u,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",e),document.removeEventListener("focusout",t),n.disconnect()}}},[r,u,h.paused]),o.useEffect(()=>{if(u){P.add(h);let e=document.activeElement;if(!u.contains(e)){let t=new CustomEvent(C,j);u.addEventListener(C,f),u.dispatchEvent(t),t.defaultPrevented||(function(e){let{select:t=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.activeElement;for(let r of e)if(F(r,{select:t}),document.activeElement!==n)return}(O(u).filter(e=>"A"!==e.tagName),{select:!0}),document.activeElement===e&&F(u))}return()=>{u.removeEventListener(C,f),setTimeout(()=>{let t=new CustomEvent(R,j);u.addEventListener(R,p),u.dispatchEvent(t),t.defaultPrevented||F(null!=e?e:document.body,{select:!0}),u.removeEventListener(R,p),P.remove(h)},0)}}},[u,f,p,h]);let b=o.useCallback(e=>{if(!n&&!r||h.paused)return;let t="Tab"===e.key&&!e.altKey&&!e.ctrlKey&&!e.metaKey,o=document.activeElement;if(t&&o){let t=e.currentTarget,[r,l]=function(e){let t=O(e);return[I(t,e),I(t.reverse(),e)]}(t);r&&l?e.shiftKey||o!==l?e.shiftKey&&o===r&&(e.preventDefault(),n&&F(l,{select:!0})):(e.preventDefault(),n&&F(r,{select:!0})):o===t&&e.preventDefault()}},[n,r,h.paused]);return(0,c.jsx)(g.div,{tabIndex:-1,...s,ref:m,onKeyDown:b})});function O(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{let t="INPUT"===e.tagName&&"hidden"===e.type;return e.disabled||e.hidden||t?NodeFilter.FILTER_SKIP:e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function I(e,t){for(let n of e)if(!function(e,t){let{upTo:n}=t;if("hidden"===getComputedStyle(e).visibility)return!0;for(;e&&(void 0===n||e!==n);){if("none"===getComputedStyle(e).display)return!0;e=e.parentElement}return!1}(n,{upTo:t}))return n}function F(e){let{select:t=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e&&e.focus){var n;let r=document.activeElement;e.focus({preventScroll:!0}),e!==r&&(n=e)instanceof HTMLInputElement&&"select"in n&&t&&e.select()}}N.displayName="FocusScope";var P=function(){let e=[];return{add(t){let n=e[0];t!==n&&(null==n||n.pause()),(e=A(e,t)).unshift(t)},remove(t){var n;null===(n=(e=A(e,t))[0])||void 0===n||n.resume()}}}();function A(e,t){let n=[...e],r=n.indexOf(t);return -1!==r&&n.splice(r,1),n}var L=n(6611),T=o.forwardRef((e,t)=>{var n,r;let{container:l,...i}=e,[a,s]=o.useState(!1);(0,L.N)(()=>s(!0),[]);let u=l||a&&(null===(r=globalThis)||void 0===r?void 0:null===(n=r.document)||void 0===n?void 0:n.body);return u?d.createPortal((0,c.jsx)(g.div,{...i,ref:t}),u):null});T.displayName="Portal";var k=n(7028),_=n(2292),S=n(4065),M=n(5587),W="Dialog",[B,V]=(0,a.A)(W),[K,q]=B(W),U=e=>{let{__scopeDialog:t,children:n,open:r,defaultOpen:l,onOpenChange:i,modal:a=!0}=e,d=o.useRef(null),f=o.useRef(null),[p=!1,v]=(0,u.i)({prop:r,defaultProp:l,onChange:i});return(0,c.jsx)(K,{scope:t,triggerRef:d,contentRef:f,contentId:(0,s.B)(),titleId:(0,s.B)(),descriptionId:(0,s.B)(),open:p,onOpenChange:v,onOpenToggle:o.useCallback(()=>v(e=>!e),[v]),modal:a,children:n})};U.displayName=W;var z="DialogTrigger",Z=o.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=q(z,n),a=(0,i.s)(t,o.triggerRef);return(0,c.jsx)(g.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":ec(o.open),...r,ref:a,onClick:(0,l.m)(e.onClick,o.onOpenToggle)})});Z.displayName=z;var G="DialogPortal",[H,Y]=B(G,{forceMount:void 0}),J=e=>{let{__scopeDialog:t,forceMount:n,children:r,container:l}=e,i=q(G,t);return(0,c.jsx)(H,{scope:t,forceMount:n,children:o.Children.map(r,e=>(0,c.jsx)(k.C,{present:n||i.open,children:(0,c.jsx)(T,{asChild:!0,container:l,children:e})}))})};J.displayName=G;var X="DialogOverlay",$=o.forwardRef((e,t)=>{let n=Y(X,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,l=q(X,e.__scopeDialog);return l.modal?(0,c.jsx)(k.C,{present:r||l.open,children:(0,c.jsx)(Q,{...o,ref:t})}):null});$.displayName=X;var Q=o.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=q(X,n);return(0,c.jsx)(S.A,{as:f,allowPinchZoom:!0,shards:[o.contentRef],children:(0,c.jsx)(g.div,{"data-state":ec(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),ee="DialogContent",et=o.forwardRef((e,t)=>{let n=Y(ee,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,l=q(ee,e.__scopeDialog);return(0,c.jsx)(k.C,{present:r||l.open,children:l.modal?(0,c.jsx)(en,{...o,ref:t}):(0,c.jsx)(er,{...o,ref:t})})});et.displayName=ee;var en=o.forwardRef((e,t)=>{let n=q(ee,e.__scopeDialog),r=o.useRef(null),a=(0,i.s)(t,n.contentRef,r);return o.useEffect(()=>{let e=r.current;if(e)return(0,M.Eq)(e)},[]),(0,c.jsx)(eo,{...e,ref:a,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,l.m)(e.onCloseAutoFocus,e=>{var t;e.preventDefault(),null===(t=n.triggerRef.current)||void 0===t||t.focus()}),onPointerDownOutside:(0,l.m)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey;(2===t.button||n)&&e.preventDefault()}),onFocusOutside:(0,l.m)(e.onFocusOutside,e=>e.preventDefault())})}),er=o.forwardRef((e,t)=>{let n=q(ee,e.__scopeDialog),r=o.useRef(!1),l=o.useRef(!1);return(0,c.jsx)(eo,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var o,i;null===(o=e.onCloseAutoFocus)||void 0===o||o.call(e,t),t.defaultPrevented||(r.current||null===(i=n.triggerRef.current)||void 0===i||i.focus(),t.preventDefault()),r.current=!1,l.current=!1},onInteractOutside:t=>{var o,i;null===(o=e.onInteractOutside)||void 0===o||o.call(e,t),t.defaultPrevented||(r.current=!0,"pointerdown"!==t.detail.originalEvent.type||(l.current=!0));let a=t.target;(null===(i=n.triggerRef.current)||void 0===i?void 0:i.contains(a))&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&l.current&&t.preventDefault()}})}),eo=o.forwardRef((e,t)=>{let{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:l,onCloseAutoFocus:a,...s}=e,u=q(ee,n),d=o.useRef(null),f=(0,i.s)(t,d);return(0,_.Oh)(),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(N,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:l,onUnmountAutoFocus:a,children:(0,c.jsx)(D,{role:"dialog",id:u.contentId,"aria-describedby":u.descriptionId,"aria-labelledby":u.titleId,"data-state":ec(u.open),...s,ref:f,onDismiss:()=>u.onOpenChange(!1)})}),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(em,{titleId:u.titleId}),(0,c.jsx)(eg,{contentRef:d,descriptionId:u.descriptionId})]})]})}),el="DialogTitle",ei=o.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=q(el,n);return(0,c.jsx)(g.h2,{id:o.titleId,...r,ref:t})});ei.displayName=el;var ea="DialogDescription",es=o.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=q(ea,n);return(0,c.jsx)(g.p,{id:o.descriptionId,...r,ref:t})});es.displayName=ea;var eu="DialogClose",ed=o.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=q(eu,n);return(0,c.jsx)(g.button,{type:"button",...r,ref:t,onClick:(0,l.m)(e.onClick,()=>o.onOpenChange(!1))})});function ec(e){return e?"open":"closed"}ed.displayName=eu;var ef="DialogTitleWarning",[ep,ev]=(0,a.q)(ef,{contentName:ee,titleName:el,docsSlug:"dialog"}),em=e=>{let{titleId:t}=e,n=ev(ef),r="`".concat(n.contentName,"` requires a `").concat(n.titleName,"` for the component to be accessible for screen reader users.\n\nIf you want to hide the `").concat(n.titleName,"`, you can wrap it with our VisuallyHidden component.\n\nFor more information, see https://radix-ui.com/primitives/docs/components/").concat(n.docsSlug);return o.useEffect(()=>{t&&!document.getElementById(t)&&console.error(r)},[r,t]),null},eg=e=>{let{contentRef:t,descriptionId:n}=e,r=ev("DialogDescriptionWarning"),l="Warning: Missing `Description` or `aria-describedby={undefined}` for {".concat(r.contentName,"}.");return o.useEffect(()=>{var e;let r=null===(e=t.current)||void 0===e?void 0:e.getAttribute("aria-describedby");n&&r&&!document.getElementById(n)&&console.warn(l)},[l,t,n]),null},ey=U,eh=Z,eb=J,eE=$,eD=et,ex=ei,ew=es,eC=ed},6195:(e,t,n)=>{n.d(t,{b:()=>a});var r=n(2115),o=n(3360),l=n(5155),i=r.forwardRef((e,t)=>(0,l.jsx)(o.sG.label,{...e,ref:t,onMouseDown:t=>{var n;t.target.closest("button, input, select, textarea")||(null===(n=e.onMouseDown)||void 0===n||n.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));i.displayName="Label";var a=i},632:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(4057).A)("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},5686:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(4057).A)("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]])},5524:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(4057).A)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])}}]);
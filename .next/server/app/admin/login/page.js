(()=>{var e={};e.id=116,e.ids=[116],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},2412:e=>{"use strict";e.exports=require("assert")},5511:e=>{"use strict";e.exports=require("crypto")},4735:e=>{"use strict";e.exports=require("events")},9021:e=>{"use strict";e.exports=require("fs")},1630:e=>{"use strict";e.exports=require("http")},5591:e=>{"use strict";e.exports=require("https")},1820:e=>{"use strict";e.exports=require("os")},3873:e=>{"use strict";e.exports=require("path")},7910:e=>{"use strict";e.exports=require("stream")},3997:e=>{"use strict";e.exports=require("tty")},9551:e=>{"use strict";e.exports=require("url")},8354:e=>{"use strict";e.exports=require("util")},4075:e=>{"use strict";e.exports=require("zlib")},5232:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>p,pages:()=>u,routeModule:()=>c,tree:()=>l});var s=t(260),a=t(8203),i=t(5155),n=t.n(i),o=t(7292),d={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);t.d(r,d);let l=["",{children:["admin",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,7733)),"/Volumes/My personal/github/Cypress_taxi/frontend/booking_app/app/admin/login/page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,8436))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,9611)),"/Volumes/My personal/github/Cypress_taxi/frontend/booking_app/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,8436))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["/Volumes/My personal/github/Cypress_taxi/frontend/booking_app/app/admin/login/page.tsx"],p={require:t,loadChunk:()=>Promise.resolve()},c=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/admin/login/page",pathname:"/admin/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},2177:(e,r,t)=>{Promise.resolve().then(t.bind(t,7733))},5329:(e,r,t)=>{Promise.resolve().then(t.bind(t,7221))},7221:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>y});var s=t(5512),a=t(7021),i=t(8009),n=t(9462);let o=i.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,n.cn)("rounded-xl border bg-card text-card-foreground shadow",e),...r}));o.displayName="Card";let d=i.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",e),...r}));d.displayName="CardHeader";let l=i.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,n.cn)("font-semibold leading-none tracking-tight",e),...r}));l.displayName="CardTitle";let u=i.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,n.cn)("text-sm text-muted-foreground",e),...r}));u.displayName="CardDescription";let p=i.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,n.cn)("p-6 pt-0",e),...r}));p.displayName="CardContent";let c=i.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,n.cn)("flex items-center p-6 pt-0",e),...r}));c.displayName="CardFooter";var m=t(5409),f=t(7699),x=t(801);let g=(0,t(4825).A)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);var h=t(9334),v=t(2273),b=t(4942);function y(){let[e,r]=(0,i.useState)(""),[t,n]=(0,i.useState)(""),y=(0,h.useRouter)(),{toast:w}=(0,x.dj)(),j=(0,v.wA)(),{token:_,isLoading:N}=(0,v.d4)(e=>e.auth),P=async r=>{r.preventDefault();try{await j((0,b.b7)({email:e,password:t})).unwrap(),w({title:"Login Successful",description:"Redirecting to dashboard..."}),y.push("/admin/dashboard")}catch(e){console.log("Error ==> ",e),w({title:"Login Failed",description:"Invalid email or password",variant:"destructive"})}};return(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-cover bg-center",style:{backgroundImage:"url('https://i.postimg.cc/JnTcbvg9/bg-1.png')"},children:(0,s.jsx)("div",{children:(0,s.jsxs)(o,{className:"w-[450px]",children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{children:"Admin Login"}),(0,s.jsx)(u,{children:"Enter your credentials to access the dashboard"})]}),(0,s.jsx)(p,{children:(0,s.jsx)("form",{onSubmit:P,children:(0,s.jsxs)("div",{className:"grid w-full items-center gap-4",children:[(0,s.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,s.jsx)(f.J,{htmlFor:"email",children:"Email"}),(0,s.jsx)(m.p,{id:"email",type:"email",placeholder:"admin@example.com",value:e,onChange:e=>r(e.target.value),required:!0})]}),(0,s.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,s.jsx)(f.J,{htmlFor:"password",children:"Password"}),(0,s.jsx)(m.p,{id:"password",type:"password",value:t,onChange:e=>n(e.target.value),required:!0})]})]})})}),(0,s.jsx)(c,{className:"flex justify-between",children:(0,s.jsx)(a.$,{type:"submit",onClick:P,disabled:N,children:N?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(g,{className:"mr-2 h-4 w-4 animate-spin"}),"Please wait"]}):"Login"})})]})})})}},7021:(e,r,t)=>{"use strict";t.d(r,{$:()=>l,r:()=>d});var s=t(5512),a=t(8009),i=t(2705),n=t(1643),o=t(9462);let d=(0,n.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),l=a.forwardRef(({className:e,variant:r,size:t,asChild:a=!1,...n},l)=>{let u=a?i.DX:"button";return(0,s.jsx)(u,{className:(0,o.cn)(d({variant:r,size:t,className:e})),ref:l,...n})});l.displayName="Button"},5409:(e,r,t)=>{"use strict";t.d(r,{p:()=>n});var s=t(5512),a=t(8009),i=t(9462);let n=a.forwardRef(({className:e,type:r,...t},a)=>(0,s.jsx)("input",{type:r,className:(0,i.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:a,...t}));n.displayName="Input"},7699:(e,r,t)=>{"use strict";t.d(r,{J:()=>l});var s=t(5512),a=t(8009),i=t(2405),n=t(1643),o=t(9462);let d=(0,n.F)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),l=a.forwardRef(({className:e,...r},t)=>(0,s.jsx)(i.b,{ref:t,className:(0,o.cn)(d(),e),...r}));l.displayName=i.b.displayName},9334:(e,r,t)=>{"use strict";var s=t(8686);t.o(s,"useParams")&&t.d(r,{useParams:function(){return s.useParams}}),t.o(s,"usePathname")&&t.d(r,{usePathname:function(){return s.usePathname}}),t.o(s,"useRouter")&&t.d(r,{useRouter:function(){return s.useRouter}})},7733:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Volumes/My personal/github/Cypress_taxi/frontend/booking_app/app/admin/login/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Volumes/My personal/github/Cypress_taxi/frontend/booking_app/app/admin/login/page.tsx","default")},8436:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var s=t(8077);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},2405:(e,r,t)=>{"use strict";t.d(r,{b:()=>o});var s=t(8009),a=t(8449),i=t(5512),n=s.forwardRef((e,r)=>(0,i.jsx)(a.sG.label,{...e,ref:r,onMouseDown:r=>{r.target.closest("button, input, select, textarea")||(e.onMouseDown?.(r),!r.defaultPrevented&&r.detail>1&&r.preventDefault())}}));n.displayName="Label";var o=n}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,882,77,921],()=>t(5232));module.exports=s})();
"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[197],{9443:(e,t,s)=>{s.d(t,{A:()=>k});var a=s(5155),l=s(6046),r=s(8173),o=s.n(r),n=s(2115),i=s(5325),d=s(5012),c=s(7493),u=s(8639),x=s(4683),h=s(1328),m=s(2187),p=s(3474),f=s(1354),g=s(3391),b=s(744),j=s(241);let y=e=>{let{icon:t,label:s,onClick:l}=e;return(0,a.jsx)("div",{className:"relative",children:(0,a.jsx)("button",{onClick:l,className:"flex items-center justify-between w-full px-4 py-2 text-left hover:bg-zinc-800 dark:hover:bg-gray-800 text-gray-800 hover:text-white rounded-md",children:(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)(t,{className:"w-5 h-5"}),(0,a.jsx)("span",{children:s})]})})})};function w(){let[e,t]=(0,n.useState)(!1),s=(0,l.useRouter)(),r=(0,g.wA)(),o=e=>{s.push(e)};return(0,a.jsxs)("aside",{className:"bg-[#F5EF1B] text-white flex flex-col transition-all duration-300 ".concat(e?"w-20":"w-70"),children:[(0,a.jsxs)("div",{className:"px-6 py-4 flex justify-between items-center",children:[!e&&(0,a.jsx)("h2",{className:"text-2xl font-bold cursor-pointer text-gray-800",onClick:()=>o("/admin/dashboard"),children:"Salmon Arm Taxi"}),(0,a.jsx)("button",{onClick:()=>{t(!e)},className:"p-2 text-gray-800",children:e?(0,a.jsx)(i.A,{}):(0,a.jsx)(d.A,{})})]}),(0,a.jsxs)("nav",{className:"flex-1 px-4 pt-5 space-y-4",children:[(0,a.jsx)(y,{icon:c.A,label:e?"":"Dashboard",onClick:()=>o("/admin/dashboard")}),(0,a.jsx)(y,{icon:u.A,label:e?"":"Booking History",onClick:()=>o("/admin/DashboardPages/Bookings/BookingHistorys")}),(0,a.jsx)(y,{icon:x.A,label:e?"":"Add Driver",onClick:()=>o("/admin/DashboardPages/DriverPage/AddDriver")}),(0,a.jsx)(y,{icon:h.A,label:e?"":"Users",onClick:()=>o("/admin/DashboardPages/DriverPage/DriverList")}),(0,a.jsx)(y,{icon:u.A,label:e?"":"Driver List with Vehicle",onClick:()=>o("/admin/DashboardPages/DriverPage/DriverwithVechicle")}),(0,a.jsx)(y,{icon:m.A,label:e?"":"Reports",onClick:()=>o("/admin/DashboardPages/Reports/")}),(0,a.jsx)(y,{icon:p.A,label:e?"":"Settings",onClick:()=>o("/admin/DashboardPages/Settings/")})]}),(0,a.jsx)("div",{className:"px-4 py-4",children:(0,a.jsx)("button",{onClick:()=>{r((0,b.ri)()),(0,j.oR)({title:"Successful Logout",description:"Redirecting to Login Page ..."}),s.push("/admin/login")},className:"w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:e?(0,a.jsx)(f.A,{}):"Logout"})})]})}var N=s(689),v=s(7936);function A(){let e=(0,l.useRouter)(),t=(0,g.wA)(),[s,r]=(0,n.useState)(!1),o=()=>{t((0,b.ri)()),(0,j.oR)({title:"Successful Logout",description:"Redirecting to Login Page ..."}),e.push("/admin/login")};return(0,a.jsxs)("header",{className:"w-full bg-[#F5EF1B] shadow-sm",children:[(0,a.jsxs)("div",{className:"px-6 py-4 flex items-center justify-between",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-zinc-800",children:"Admin Dashboard"}),(0,a.jsxs)("div",{className:"hidden md:flex items-center space-x-4",children:[(0,a.jsx)("button",{className:"px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"+ Report"}),(0,a.jsx)("button",{onClick:o,className:"px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"Logout"})]}),(0,a.jsx)("button",{onClick:()=>{r(!s)},className:"md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none",children:s?(0,a.jsx)(N.A,{size:24}):(0,a.jsx)(v.A,{size:24})})]}),s&&(0,a.jsxs)("div",{className:"md:hidden px-6 pb-4 space-y-2",children:[(0,a.jsx)("button",{className:"w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"+ Report"}),(0,a.jsx)("button",{onClick:o,className:"w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"Logout"})]})]})}function k(e){let{children:t}=e,s=(0,l.usePathname)(),r=(0,l.useRouter)(),i=s.split("/").filter(Boolean),[d,c]=(0,n.useState)(null);return((0,n.useEffect)(()=>{localStorage.getItem("token")?c(!0):(r.push("/admin/login"),c(!1))},[s]),null!==d&&d)?(0,a.jsxs)("div",{className:"flex h-screen bg-gray-100",children:[(0,a.jsx)(w,{}),(0,a.jsxs)("div",{className:"flex-1 flex flex-col overflow-hidden",children:[(0,a.jsx)(A,{}),(0,a.jsx)("nav",{className:"shadow-sm p-4 bg-zinc-800",children:(0,a.jsx)("ul",{className:"flex space-x-2 text-white text-sm",children:i.map((e,t)=>{let s="/".concat(i.slice(0,t+1).join("/"));return(0,a.jsxs)("li",{className:"flex items-center",children:[(0,a.jsx)("span",{className:"mx-2",children:"/"}),(0,a.jsx)(o(),{href:s,className:"hover:text-[#F5EF1B] capitalize",children:e})]},s)})})}),(0,a.jsx)("main",{className:"flex-1 overflow-y-auto p-6 bg-zinc-800",children:(0,a.jsx)("div",{className:"max-w-full mx-auto space-y-6",children:t})})]})]}):null}},744:(e,t,s)=>{s.d(t,{Ay:()=>d,b7:()=>o,ri:()=>i});var a=s(8943),l=s(2651);let r={token:localStorage.getItem("token"),isLoading:!1,error:null},o=(0,a.zD)("auth/loginAdmin",async(e,t)=>{let{email:s,password:a}=e,{rejectWithValue:r}=t;try{let e=(await l.A.post("http://localhost:5000/api/auth/login",{email:s,password:a})).data.token;return localStorage.setItem("token",e),e}catch(e){return console.error(e),r("An unexpected error occurred")}}),n=(0,a.Z0)({name:"auth",initialState:r,reducers:{logout:e=>{e.token=null,localStorage.removeItem("token")}},extraReducers:e=>{e.addCase(o.pending,e=>{e.isLoading=!0,e.error=null}).addCase(o.fulfilled,(e,t)=>{e.isLoading=!1,e.token=t.payload,e.error=null}).addCase(o.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload})}}),{logout:i}=n.actions,d=n.reducer},2079:(e,t,s)=>{s.d(t,{A0:()=>n,BF:()=>i,Hj:()=>d,XI:()=>o,nA:()=>u,nd:()=>c});var a=s(5155),l=s(2115),r=s(9602);let o=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,a.jsx)("div",{className:"relative w-full overflow-auto",children:(0,a.jsx)("table",{ref:t,className:(0,r.cn)("w-full caption-bottom text-sm",s),...l})})});o.displayName="Table";let n=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,a.jsx)("thead",{ref:t,className:(0,r.cn)("[&_tr]:border-b",s),...l})});n.displayName="TableHeader";let i=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,a.jsx)("tbody",{ref:t,className:(0,r.cn)("[&_tr:last-child]:border-0",s),...l})});i.displayName="TableBody",l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,a.jsx)("tfoot",{ref:t,className:(0,r.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",s),...l})}).displayName="TableFooter";let d=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,a.jsx)("tr",{ref:t,className:(0,r.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",s),...l})});d.displayName="TableRow";let c=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,a.jsx)("th",{ref:t,className:(0,r.cn)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",s),...l})});c.displayName="TableHead";let u=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,a.jsx)("td",{ref:t,className:(0,r.cn)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",s),...l})});u.displayName="TableCell",l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,a.jsx)("caption",{ref:t,className:(0,r.cn)("mt-4 text-sm text-muted-foreground",s),...l})}).displayName="TableCaption"},241:(e,t,s)=>{s.d(t,{dj:()=>x,oR:()=>u});var a=s(2115);let l=0,r=new Map,o=e=>{if(r.has(e))return;let t=setTimeout(()=>{r.delete(e),c({type:"REMOVE_TOAST",toastId:e})},1e6);r.set(e,t)},n=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:s}=t;return s?o(s):e.toasts.forEach(e=>{o(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},i=[],d={toasts:[]};function c(e){d=n(d,e),i.forEach(e=>{e(d)})}function u(e){let{...t}=e,s=(l=(l+1)%Number.MAX_SAFE_INTEGER).toString(),a=()=>c({type:"DISMISS_TOAST",toastId:s});return c({type:"ADD_TOAST",toast:{...t,id:s,open:!0,onOpenChange:e=>{e||a()}}}),{id:s,dismiss:a,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:s}})}}function x(){let[e,t]=a.useState(d);return a.useEffect(()=>(i.push(t),()=>{let e=i.indexOf(t);e>-1&&i.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},9602:(e,t,s)=>{s.d(t,{cn:()=>r});var a=s(3463),l=s(9795);function r(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,l.QP)((0,a.$)(t))}}}]);
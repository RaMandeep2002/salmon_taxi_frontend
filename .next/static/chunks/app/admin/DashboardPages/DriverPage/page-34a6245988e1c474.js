(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[153],{4142:(e,t,s)=>{Promise.resolve().then(s.bind(s,5039))},9443:(e,t,s)=>{"use strict";s.d(t,{A:()=>S});var a=s(5155),l=s(6046),n=s(8173),i=s.n(n),o=s(2115),r=s(5325),c=s(5012),d=s(7493),u=s(8639),x=s(4683),h=s(1328),m=s(2187),g=s(3474),p=s(1354),f=s(3391),b=s(744),j=s(241);let y=e=>{let{icon:t,label:s,onClick:l}=e;return(0,a.jsx)("div",{className:"relative",children:(0,a.jsx)("button",{onClick:l,className:"flex items-center justify-between w-full px-4 py-2 text-left hover:bg-zinc-800 dark:hover:bg-gray-800 text-gray-800 hover:text-white rounded-md",children:(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)(t,{className:"w-5 h-5"}),(0,a.jsx)("span",{children:s})]})})})};function v(){let[e,t]=(0,o.useState)(!1),s=(0,l.useRouter)(),n=(0,f.wA)(),i=e=>{s.push(e)};return(0,a.jsxs)("aside",{className:"bg-[#F5EF1B] text-white flex flex-col transition-all duration-300 ".concat(e?"w-20":"w-70"),children:[(0,a.jsxs)("div",{className:"px-6 py-4 flex justify-between items-center",children:[!e&&(0,a.jsx)("h2",{className:"text-2xl font-bold cursor-pointer text-gray-800",onClick:()=>i("/admin/dashboard"),children:"Salmon Arm Taxi"}),(0,a.jsx)("button",{onClick:()=>{t(!e)},className:"p-2 text-gray-800",children:e?(0,a.jsx)(r.A,{}):(0,a.jsx)(c.A,{})})]}),(0,a.jsxs)("nav",{className:"flex-1 px-4 pt-5 space-y-4",children:[(0,a.jsx)(y,{icon:d.A,label:e?"":"Dashboard",onClick:()=>i("/admin/dashboard")}),(0,a.jsx)(y,{icon:u.A,label:e?"":"Booking History",onClick:()=>i("/admin/DashboardPages/Bookings/BookingHistorys")}),(0,a.jsx)(y,{icon:x.A,label:e?"":"Add Driver",onClick:()=>i("/admin/DashboardPages/DriverPage/AddDriver")}),(0,a.jsx)(y,{icon:h.A,label:e?"":"Users",onClick:()=>i("/admin/DashboardPages/DriverPage/DriverList")}),(0,a.jsx)(y,{icon:u.A,label:e?"":"Driver List with Vehicle",onClick:()=>i("/admin/DashboardPages/DriverPage/DriverwithVechicle")}),(0,a.jsx)(y,{icon:m.A,label:e?"":"Reports",onClick:()=>i("/admin/DashboardPages/Reports/")}),(0,a.jsx)(y,{icon:g.A,label:e?"":"Settings",onClick:()=>i("/admin/DashboardPages/Settings/")})]}),(0,a.jsx)("div",{className:"px-4 py-4",children:(0,a.jsx)("button",{onClick:()=>{n((0,b.ri)()),(0,j.oR)({title:"Successful Logout",description:"Redirecting to Login Page ..."}),s.push("/admin/login")},className:"w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:e?(0,a.jsx)(p.A,{}):"Logout"})})]})}var w=s(689),A=s(7936);function N(){let e=(0,l.useRouter)(),t=(0,f.wA)(),[s,n]=(0,o.useState)(!1),i=()=>{t((0,b.ri)()),(0,j.oR)({title:"Successful Logout",description:"Redirecting to Login Page ..."}),e.push("/admin/login")};return(0,a.jsxs)("header",{className:"w-full bg-[#F5EF1B] shadow-sm",children:[(0,a.jsxs)("div",{className:"px-6 py-4 flex items-center justify-between",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-zinc-800",children:"Admin Dashboard"}),(0,a.jsxs)("div",{className:"hidden md:flex items-center space-x-4",children:[(0,a.jsx)("button",{className:"px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"+ Report"}),(0,a.jsx)("button",{onClick:i,className:"px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"Logout"})]}),(0,a.jsx)("button",{onClick:()=>{n(!s)},className:"md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none",children:s?(0,a.jsx)(w.A,{size:24}):(0,a.jsx)(A.A,{size:24})})]}),s&&(0,a.jsxs)("div",{className:"md:hidden px-6 pb-4 space-y-2",children:[(0,a.jsx)("button",{className:"w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"+ Report"}),(0,a.jsx)("button",{onClick:i,className:"w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"Logout"})]})]})}function S(e){let{children:t}=e,s=(0,l.usePathname)(),n=(0,l.useRouter)(),r=s.split("/").filter(Boolean),[c,d]=(0,o.useState)(null);return((0,o.useEffect)(()=>{localStorage.getItem("token")?d(!0):(n.push("/admin/login"),d(!1))},[s]),null!==c&&c)?(0,a.jsxs)("div",{className:"flex h-screen bg-gray-100",children:[(0,a.jsx)(v,{}),(0,a.jsxs)("div",{className:"flex-1 flex flex-col overflow-hidden",children:[(0,a.jsx)(N,{}),(0,a.jsx)("nav",{className:"shadow-sm p-4 bg-zinc-800",children:(0,a.jsx)("ul",{className:"flex space-x-2 text-white text-sm",children:r.map((e,t)=>{let s="/".concat(r.slice(0,t+1).join("/"));return(0,a.jsxs)("li",{className:"flex items-center",children:[(0,a.jsx)("span",{className:"mx-2",children:"/"}),(0,a.jsx)(i(),{href:s,className:"hover:text-[#F5EF1B] capitalize",children:e})]},s)})})}),(0,a.jsx)("main",{className:"flex-1 overflow-y-auto p-6 bg-zinc-800",children:(0,a.jsx)("div",{className:"max-w-full mx-auto space-y-6",children:t})})]})]}):null}},5039:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var a=s(5155),l=s(9443);function n(){return(0,a.jsx)(l.A,{children:(0,a.jsx)("div",{className:"max-w-full mx-auto",children:(0,a.jsx)("h1",{className:"font-bold p-4 text-lg",children:"Driver Management"})})})}},744:(e,t,s)=>{"use strict";s.d(t,{Ay:()=>c,b7:()=>i,ri:()=>r});var a=s(8943),l=s(2651);let n={token:localStorage.getItem("token"),isLoading:!1,error:null},i=(0,a.zD)("auth/loginAdmin",async(e,t)=>{let{email:s,password:a}=e,{rejectWithValue:n}=t;try{let e=(await l.A.post("http://localhost:5000/api/auth/login",{email:s,password:a})).data.token;return localStorage.setItem("token",e),e}catch(e){return console.error(e),n("An unexpected error occurred")}}),o=(0,a.Z0)({name:"auth",initialState:n,reducers:{logout:e=>{e.token=null,localStorage.removeItem("token")}},extraReducers:e=>{e.addCase(i.pending,e=>{e.isLoading=!0,e.error=null}).addCase(i.fulfilled,(e,t)=>{e.isLoading=!1,e.token=t.payload,e.error=null}).addCase(i.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload})}}),{logout:r}=o.actions,c=o.reducer},241:(e,t,s)=>{"use strict";s.d(t,{dj:()=>x,oR:()=>u});var a=s(2115);let l=0,n=new Map,i=e=>{if(n.has(e))return;let t=setTimeout(()=>{n.delete(e),d({type:"REMOVE_TOAST",toastId:e})},1e6);n.set(e,t)},o=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:s}=t;return s?i(s):e.toasts.forEach(e=>{i(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},r=[],c={toasts:[]};function d(e){c=o(c,e),r.forEach(e=>{e(c)})}function u(e){let{...t}=e,s=(l=(l+1)%Number.MAX_SAFE_INTEGER).toString(),a=()=>d({type:"DISMISS_TOAST",toastId:s});return d({type:"ADD_TOAST",toast:{...t,id:s,open:!0,onOpenChange:e=>{e||a()}}}),{id:s,dismiss:a,update:e=>d({type:"UPDATE_TOAST",toast:{...e,id:s}})}}function x(){let[e,t]=a.useState(c);return a.useEffect(()=>(r.push(t),()=>{let e=r.indexOf(t);e>-1&&r.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>d({type:"DISMISS_TOAST",toastId:e})}}}},e=>{var t=t=>e(e.s=t);e.O(0,[559,819,441,517,358],()=>t(4142)),_N_E=e.O()}]);
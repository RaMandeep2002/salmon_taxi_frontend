(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[247],{2868:(e,t,s)=>{Promise.resolve().then(s.bind(s,8557))},9443:(e,t,s)=>{"use strict";s.d(t,{A:()=>E});var l=s(5155),a=s(6046),r=s(8173),i=s.n(r),n=s(2115),o=s(5325),c=s(5012),d=s(7493),u=s(8639),x=s(4683),h=s(1328),g=s(2187),m=s(3474),p=s(1354),b=s(3391),f=s(744),v=s(241);let j=e=>{let{icon:t,label:s,onClick:a}=e;return(0,l.jsx)("div",{className:"relative",children:(0,l.jsx)("button",{onClick:a,className:"flex items-center justify-between w-full px-4 py-2 text-left hover:bg-zinc-800 dark:hover:bg-gray-800 text-gray-800 hover:text-white rounded-md",children:(0,l.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,l.jsx)(t,{className:"w-5 h-5"}),(0,l.jsx)("span",{children:s})]})})})};function y(){let[e,t]=(0,n.useState)(!1),s=(0,a.useRouter)(),r=(0,b.wA)(),i=e=>{s.push(e)};return(0,l.jsxs)("aside",{className:"bg-[#F5EF1B] text-white flex flex-col transition-all duration-300 ".concat(e?"w-20":"w-70"),children:[(0,l.jsxs)("div",{className:"px-6 py-4 flex justify-between items-center",children:[!e&&(0,l.jsx)("h2",{className:"text-2xl font-bold cursor-pointer text-gray-800",onClick:()=>i("/admin/dashboard"),children:"Salmon Arm Taxi"}),(0,l.jsx)("button",{onClick:()=>{t(!e)},className:"p-2 text-gray-800",children:e?(0,l.jsx)(o.A,{}):(0,l.jsx)(c.A,{})})]}),(0,l.jsxs)("nav",{className:"flex-1 px-4 pt-5 space-y-4",children:[(0,l.jsx)(j,{icon:d.A,label:e?"":"Dashboard",onClick:()=>i("/admin/dashboard")}),(0,l.jsx)(j,{icon:u.A,label:e?"":"Booking History",onClick:()=>i("/admin/DashboardPages/Bookings/BookingHistorys")}),(0,l.jsx)(j,{icon:x.A,label:e?"":"Add Driver",onClick:()=>i("/admin/DashboardPages/DriverPage/AddDriver")}),(0,l.jsx)(j,{icon:h.A,label:e?"":"Users",onClick:()=>i("/admin/DashboardPages/DriverPage/DriverList")}),(0,l.jsx)(j,{icon:u.A,label:e?"":"Driver List with Vehicle",onClick:()=>i("/admin/DashboardPages/DriverPage/DriverwithVechicle")}),(0,l.jsx)(j,{icon:g.A,label:e?"":"Reports",onClick:()=>i("/admin/DashboardPages/Reports/")}),(0,l.jsx)(j,{icon:m.A,label:e?"":"Settings",onClick:()=>i("/admin/DashboardPages/Settings/")})]}),(0,l.jsx)("div",{className:"px-4 py-4",children:(0,l.jsx)("button",{onClick:()=>{r((0,f.ri)()),(0,v.oR)({title:"Successful Logout",description:"Redirecting to Login Page ..."}),s.push("/admin/login")},className:"w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:e?(0,l.jsx)(p.A,{}):"Logout"})})]})}var w=s(689),N=s(7936);function F(){let e=(0,a.useRouter)(),t=(0,b.wA)(),[s,r]=(0,n.useState)(!1),i=()=>{t((0,f.ri)()),(0,v.oR)({title:"Successful Logout",description:"Redirecting to Login Page ..."}),e.push("/admin/login")};return(0,l.jsxs)("header",{className:"w-full bg-[#F5EF1B] shadow-sm",children:[(0,l.jsxs)("div",{className:"px-6 py-4 flex items-center justify-between",children:[(0,l.jsx)("h1",{className:"text-2xl font-bold text-zinc-800",children:"Admin Dashboard"}),(0,l.jsxs)("div",{className:"hidden md:flex items-center space-x-4",children:[(0,l.jsx)("button",{className:"px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"+ Report"}),(0,l.jsx)("button",{onClick:i,className:"px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"Logout"})]}),(0,l.jsx)("button",{onClick:()=>{r(!s)},className:"md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none",children:s?(0,l.jsx)(w.A,{size:24}):(0,l.jsx)(N.A,{size:24})})]}),s&&(0,l.jsxs)("div",{className:"md:hidden px-6 pb-4 space-y-2",children:[(0,l.jsx)("button",{className:"w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"+ Report"}),(0,l.jsx)("button",{onClick:i,className:"w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition",children:"Logout"})]})]})}function E(e){let{children:t}=e,s=(0,a.usePathname)(),r=(0,a.useRouter)(),o=s.split("/").filter(Boolean),[c,d]=(0,n.useState)(null);return((0,n.useEffect)(()=>{localStorage.getItem("token")?d(!0):(r.push("/admin/login"),d(!1))},[s]),null!==c&&c)?(0,l.jsxs)("div",{className:"flex h-screen bg-gray-100",children:[(0,l.jsx)(y,{}),(0,l.jsxs)("div",{className:"flex-1 flex flex-col overflow-hidden",children:[(0,l.jsx)(F,{}),(0,l.jsx)("nav",{className:"shadow-sm p-4 bg-zinc-800",children:(0,l.jsx)("ul",{className:"flex space-x-2 text-white text-sm",children:o.map((e,t)=>{let s="/".concat(o.slice(0,t+1).join("/"));return(0,l.jsxs)("li",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"mx-2",children:"/"}),(0,l.jsx)(i(),{href:s,className:"hover:text-[#F5EF1B] capitalize",children:e})]},s)})})}),(0,l.jsx)("main",{className:"flex-1 overflow-y-auto p-6 bg-zinc-800",children:(0,l.jsx)("div",{className:"max-w-full mx-auto space-y-6",children:t})})]})]}):null}},8557:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var l=s(5155),a=s(9443),r=s(5751),i=s(6046),n=s(2115),o=s(3391);function c(){let[e,t]=(0,n.useState)(""),[s,c]=(0,n.useState)(""),[d,u]=(0,n.useState)(""),[x,h]=(0,n.useState)("active"),[g,m]=(0,n.useState)(""),[p,b]=(0,n.useState)(!1),{driverId:f}=(0,i.useParams)(),v=(0,o.wA)(),j=async l=>{l.preventDefault(),b(!0);try{console.log("year ==> ",d),await v((0,r.g)({driverId:f,vehicle:{make:e,vehicleModel:s,year:Number(d),status:x}})).unwrap(),alert("Vehicle registered successfully"),t(""),c(""),u(""),h("active")}catch(e){console.error(e),m("Error happens!!")}finally{b(!1)}};return(0,l.jsx)(a.A,{children:(0,l.jsxs)("div",{className:"max-w-full mx-auto",children:[(0,l.jsx)("h2",{className:"text-2xl font-bold text-center mb-6 text-[#F5EF1B]",children:"Register New Vehicle"}),(0,l.jsxs)("div",{className:"max-w-2xl mx-auto p-8 mt-12",children:[g&&(0,l.jsx)("p",{className:"text-red-500 text-center",children:String(g)}),(0,l.jsxs)("form",{onSubmit:j,className:"space-y-6",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{className:"block text-lg font-medium text-[#F5EF1B]",children:"Driver ID"}),(0,l.jsx)("input",{type:"text",name:"driverId",value:f,className:"w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent"})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{className:"block text-lg font-medium text-[#F5EF1B]",children:"Make"}),(0,l.jsx)("input",{type:"text",name:"make",placeholder:"Enter Vehicle Make",value:e,onChange:e=>t(e.target.value),required:!0,className:"w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent placeholder:text-[#F5EF1B]/50"})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{className:"block text-lg font-medium text-[#F5EF1B]",children:"Model"}),(0,l.jsx)("input",{type:"text",name:"vehicleModel",placeholder:"Enter Vehicle Model",value:s,onChange:e=>c(e.target.value),required:!0,className:"w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent placeholder:text-[#F5EF1B]/50"})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{className:"block text-lg font-medium text-[#F5EF1B]",children:"Year"}),(0,l.jsx)("input",{type:"number",name:"year",placeholder:"Enter Year of Manufacture",value:d,onChange:e=>u(e.target.value),required:!0,min:"1900",max:"2099",className:"w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent placeholder:text-[#F5EF1B]/50"})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{className:"block text-lg font-medium text-[#F5EF1B]",children:"Status"}),(0,l.jsxs)("select",{value:x,onChange:e=>h(e.target.value),required:!0,className:"w-full px-4 py-3 border border-[#F5EF1B] rounded-lg  text-[#F5EF1B] text-lg bg-transparent placeholder:text-[#F5EF1B]/50",children:[(0,l.jsx)("option",{value:"active",children:"Active"}),(0,l.jsx)("option",{value:"free",children:"Free"})]})]}),(0,l.jsx)("button",{type:"submit",className:"w-full bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 py-3 text-lg font-semibold  transition duration-300",children:p?"Registering...":"Register Vehicle"})]})]})]})})}},744:(e,t,s)=>{"use strict";s.d(t,{Ay:()=>c,b7:()=>i,ri:()=>o});var l=s(8943),a=s(2651);let r={token:localStorage.getItem("token"),isLoading:!1,error:null},i=(0,l.zD)("auth/loginAdmin",async(e,t)=>{let{email:s,password:l}=e,{rejectWithValue:r}=t;try{let e=(await a.A.post("http://localhost:5000/api/auth/login",{email:s,password:l})).data.token;return localStorage.setItem("token",e),e}catch(e){return console.error(e),r("An unexpected error occurred")}}),n=(0,l.Z0)({name:"auth",initialState:r,reducers:{logout:e=>{e.token=null,localStorage.removeItem("token")}},extraReducers:e=>{e.addCase(i.pending,e=>{e.isLoading=!0,e.error=null}).addCase(i.fulfilled,(e,t)=>{e.isLoading=!1,e.token=t.payload,e.error=null}).addCase(i.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload})}}),{logout:o}=n.actions,c=n.reducer},5751:(e,t,s)=>{"use strict";s.d(t,{A:()=>i,g:()=>r});var l=s(8943),a=s(2651);let r=(0,l.zD)("admin/registerVehicle",async(e,t)=>{let{driverId:s,vehicle:l}=e,{rejectWithValue:r}=t;try{let e=localStorage.getItem("token");if(!e)throw Error("No authentication token found.");return(await a.A.post("http://localhost:5000/admin/register-vehicle/".concat(s),l,{headers:{Authorization:"Bearer ".concat(e)}})).data}catch(e){return console.log("Error ===> ",e),r("Failed to register vehicle")}}),i=(0,l.Z0)({name:"registerVehicle",initialState:{vehicles:[],isloading:!1,iserror:null},reducers:{},extraReducers:e=>{e.addCase(r.pending,e=>{e.isloading=!0,e.iserror=null}),e.addCase(r.fulfilled,(e,t)=>{e.isloading=!1,t.payload&&e.vehicles.push(t.payload)}),e.addCase(r.rejected,(e,t)=>{e.isloading=!1,e.iserror=t.error.message||null})}}).reducer},241:(e,t,s)=>{"use strict";s.d(t,{dj:()=>x,oR:()=>u});var l=s(2115);let a=0,r=new Map,i=e=>{if(r.has(e))return;let t=setTimeout(()=>{r.delete(e),d({type:"REMOVE_TOAST",toastId:e})},1e6);r.set(e,t)},n=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:s}=t;return s?i(s):e.toasts.forEach(e=>{i(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},o=[],c={toasts:[]};function d(e){c=n(c,e),o.forEach(e=>{e(c)})}function u(e){let{...t}=e,s=(a=(a+1)%Number.MAX_SAFE_INTEGER).toString(),l=()=>d({type:"DISMISS_TOAST",toastId:s});return d({type:"ADD_TOAST",toast:{...t,id:s,open:!0,onOpenChange:e=>{e||l()}}}),{id:s,dismiss:l,update:e=>d({type:"UPDATE_TOAST",toast:{...e,id:s}})}}function x(){let[e,t]=l.useState(c);return l.useEffect(()=>(o.push(t),()=>{let e=o.indexOf(t);e>-1&&o.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>d({type:"DISMISS_TOAST",toastId:e})}}}},e=>{var t=t=>e(e.s=t);e.O(0,[559,819,441,517,358],()=>t(2868)),_N_E=e.O()}]);
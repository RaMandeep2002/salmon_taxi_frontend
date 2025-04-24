import Link from "next/link";
import AboutUs from "./LandingPage/AboutUs";
// import AppDownloadSection from "./LandingPage/AppDownloadSection";
import GallerySection from "./LandingPage/GallerySection";
import HeroSection from "./LandingPage/HeroSection";
import Navbar from "./LandingPage/Navbar";
import WelcomeSection from "./LandingPage/WelcomeSection";
import {
  Mail,
  PhoneCall,
} from "lucide-react";

export default function Home() {
  return (
    // <div className="flex flex-col min-h-screen">
    //   {/* Navbar */}
    //   <Navbar />
    //   {/* HeroSection */}
    //   <main className="flex-1">
    //     <HeroSection />

    //     <WelcomeSection />

    //     <GallerySection />

    //     {/* <AppDownloadSection /> */}

    //     <AboutUs />
    //   </main>

    //   <footer className="w-full border-t  bg-gray-100">
    //     <div className="container mx-auto px-4 md:px-6 lg:px-28">
    //       <div className="flex flex-col gap-8 py-8 md:py-12 lg:py-16">
    //         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
    //           <div className="space-y-4">
    //             <div className="flex items-center gap-2">
    //               <img
    //                 src="https://i.postimg.cc/Y9MJSmtD/salmon-logo-final.jpg"
    //                 alt="Salmon Arm Taxi Logo"
    //                 className="h-10 w-10 object-contain"
    //               />
    //               <span className="text-lg font-bold">Salmon Arm Taxi</span>
    //             </div>
    //             <p className="text-sm text-muted-foreground">
    //             Locally owned Salmon Arm Taxi is a major part of transportation services in Salmon Arm all year around.By emphasizing on quality and service Salmon Arm Taxi has been providing contractual transportation services to many local and national companies.
    //             </p>
    //           </div>
    //           <div className="space-y-4">
    //             <h3 className="text-lg font-semibold">Quick Links</h3>
    //             <ul className="space-y-2 text-sm">
    //               <li>
    //                 <Link
    //                   href="#home"
    //                   className="text-muted-foreground hover:text-yellow-500 transition-colors"
    //                 >
    //                   Home
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link
    //                   href="#about"
    //                   className="text-muted-foreground hover:text-yellow-500 transition-colors"
    //                 >
    //                   About Us
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link
    //                   href="#gallery"
    //                   className="text-muted-foreground hover:text-yellow-500 transition-colors"
    //                 >
    //                   Our Fleet
    //                 </Link>
    //               </li>
    //               {/* <li>
    //                 <Link
    //                   href="#app"
    //                   className="text-muted-foreground hover:text-yellow-500 transition-colors"
    //                 >
    //                   Download App
    //                 </Link>
    //               </li> */}
    //             </ul>
    //           </div>
    //           <div id="contact" className="space-y-4">
    //             <h3 className="text-lg font-semibold">Contact Us</h3>
    //             <ul className="space-y-2 text-sm">
    //               <li className="flex items-center gap-2">
    //                 <PhoneCall className="h-4 w-4 text-yellow-500" />
    //                 <span className="text-muted-foreground">
    //                 <a
    //                 href="tel:+12508321111"
    //              className="ml-1 hover:underline hover:text-yellow-500"
    //               >
    //                 +1 (250) 832-1111
    //               </a>
    //                 </span>
    //               </li>
    //               <li className="flex items-center gap-2">
    //                 <Mail className="h-4 w-4 text-yellow-500" />
    //                 <span className="text-muted-foreground">
    //                 <a
    //                 href="mailto:salmonarmtaxi@yahoo.ca"
    //                 className="ml-1 hover:underline hover:text-yellow-500"
    //               >
    //                 salmonarmtaxi@yahoo.ca
    //               </a>
    //                 </span>
    //               </li>
    //               {/* <li className="flex items-start gap-2">
    //                 <MapPin className="h-4 w-4 text-yellow-500 mt-1" />
    //                 <span className="text-muted-foreground">
    //                   123 Taxi Street, City Center, NY 10001
    //                 </span>
    //               </li> */}
    //             </ul>
    //           </div>
    //           {/* <div className="space-y-4">
    //             <h3 className="text-lg font-semibold">Follow Us</h3>
    //             <div className="flex gap-4">
    //               <Link
    //                 href="#"
    //                 className="text-muted-foreground hover:text-yellow-500 transition-colors"
    //               >
    //                 <Facebook className="h-6 w-6" />
    //                 <span className="sr-only">Facebook</span>
    //               </Link>
    //               <Link
    //                 href="#"
    //                 className="text-muted-foreground hover:text-yellow-500 transition-colors"
    //               >
    //                 <Twitter className="h-6 w-6" />
    //                 <span className="sr-only">Twitter</span>
    //               </Link>
    //               <Link
    //                 href="#"
    //                 className="text-muted-foreground hover:text-yellow-500 transition-colors"
    //               >
    //                 <Instagram className="h-6 w-6" />
    //                 <span className="sr-only">Instagram</span>
    //               </Link>
    //             </div>
    //           </div> */}
    //         </div>
    //         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    //           <p className="text-xs text-muted-foreground">
    //             © {new Date().getFullYear()} Salmon Arm Taxi. All rights reserved.
    //           </p>
    //           <div className="flex gap-4 text-xs text-muted-foreground">
    //             <Link href="#" className="hover:underline">
    //               Privacy Policy
    //             </Link>
    //             <Link href="#" className="hover:underline">
    //               Terms of Service
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
    <div className="flex items-center justify-center h-screen bg-cover bg-center px-4"
    style={{
      backgroundImage: "url('https://i.postimg.cc/JnTcbvg9/bg-1.png')",
    }}>
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-800 animate-pulse text-center">
        🚧 Under Construction 🚧
      </h1>
    </div>
  );
}

"use client";
import AboutUs from "./LandingPage/AboutUs";
import Footer from "./LandingPage/Footer";
// // import AppDownloadSection from "./LandingPage/AppDownloadSection";
import GallerySection from "./LandingPage/GallerySection";
import HeroSection from "./LandingPage/HeroSection";
import Navbar from "./LandingPage/Navbar";
import WelcomeSection from "./LandingPage/WelcomeSection";
import * as motion from "motion/react-client";
import { useScroll } from "motion/react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="flex flex-col min-h-screen scroll-smooth overscroll-y-contain">
       <motion.div style={{ scaleX: scrollYProgress }} />

      <main className="flex-1">
        <Navbar />
    
        <HeroSection />
    
        <WelcomeSection />

        <GallerySection />

        {/* <AppDownloadSection /> */}

        <AboutUs />

        <Footer />
      </main>
    </div>
  );
}

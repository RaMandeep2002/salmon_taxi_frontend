"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-[#F2EE21]">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.postimg.cc/Y9MJSmtD/salmon-logo-final.jpg"
            alt="SpeedyTaxi Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl font-extrabold text-black">Salmon Arm Taxi</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {["home", "about", "gallery", "contact"].map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className="text-lg font-semibold text-black hover:text-white transition-colors duration-200"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-black"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-yellow-400 px-4 pb-4">
          <nav className="flex flex-col gap-3">
            {["home", "about", "gallery", "app", "contact"].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className="text-base font-semibold text-black hover:text-white transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

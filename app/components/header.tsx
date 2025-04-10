"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../admin/slices/slice/authSlice";
import { toast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu
import { useState } from "react";
import { AppDispatch } from "../store/store";

export default function HeaderDashboard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Successful Logout",
      description: "Redirecting to Login Page ...",
    });
    router.push("/admin/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-[#F5EF1B] shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold text-zinc-800">Admin Dashboard</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition"
           onClick={() => handleNavigation("/admin/DashboardPages/Reports/")}>
            + Report
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition">
            + Report
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
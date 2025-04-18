"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../admin/slices/slice/authSlice";
import { toast } from "@/hooks/use-toast";
import { Ellipsis, MenuIcon, X } from "lucide-react"; // Import icons for mobile menu
import { useState } from "react";
import { AppDispatch } from "../store/store";
import DashboardSidebar from "./DashboardSidebar";

export default function HeaderDashboard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [isMobileSideBarOpen, setisMobileSideBarOpen] = useState(false);

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

   const toggleSideBarMenu = () => {
    setisMobileSideBarOpen(!isMobileMenuOpen);
  };

  return (
    <>
    {/* Header */}
    <header
      className="w-full bg-[#F5EF1B] shadow-sm z-50 fixed md:relative top-0 left-0"
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Sidebar Toggle on Mobile */}
        <button
          onClick={toggleSideBarMenu}
          className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none"
        >
          {isMobileSideBarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-zinc-800">Admin Dashboard</h1>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition"
            onClick={() =>
              handleNavigation("/admin/dashboard/Reports/")
            }
          >
            + Report
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Ellipsis size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-[#F5EF1B]">
          <button
            onClick={() =>
              handleNavigation("/admin/DashboardPages/Reports/")
            }
            className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition"
          >
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

    {/* Sidebar as absolute overlay on mobile */}
    {isMobileSideBarOpen && (
      <div className="fixed inset-0 z-40 md:hidden">
        <div className="absolute left-0 top-0 h-full w-64 bg-[#F5EF1B] shadow-lg">
          <DashboardSidebar />
        </div>

        {/* Overlay backdrop to close sidebar */}
        <div
          className="absolute inset-0 bg-black opacity-30"
          onClick={toggleSideBarMenu}
        ></div>
      </div>
    )}

    {/* Spacing under fixed header for mobile */}
    <div className="h-[80px] md:h-0" />
  </>
  );
}

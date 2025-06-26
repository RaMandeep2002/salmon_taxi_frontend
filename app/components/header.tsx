"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../admin/slices/slice/authSlice";
import { toast } from "@/hooks/use-toast";
import {
  Ellipsis,
  MenuIcon,
  X,
  Plus,
  LogOut,
  Home,
  Users2,
  ListChecksIcon,
  Settings,
  Clock,
  CarTaxiFront,
  SquareChartGantt,
  Clock10,
} from "lucide-react"; // Import icons for mobile menu

import { useState } from "react";
import { AppDispatch } from "../store/store";
// import DashboardSidebar from "./DashboardSidebar";
import { MenuItem } from "./MenuItems";

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
    setisMobileSideBarOpen(!isMobileSideBarOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="w-full bg-[#F5EF1B] shadow-sm z-50 fixed md:relative top-0 left-0">
        <div className="px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Sidebar Toggle on Mobile */}
          <button
            onClick={toggleSideBarMenu}
            className="md:hidden p-2 text-gray-800 hover:bg-yellow-500 rounded-lg transition-colors"
          >
            {isMobileSideBarOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-zinc-800">
            Admin Dashboard
          </h1>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
              onClick={() => handleNavigation("/admin/dashboard/Reports/")}
            >
              <Plus size={20} />
              Report
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-800 hover:bg-yellow-500 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Ellipsis size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-3 space-y-2 bg-[#F5EF1B] border-t border-yellow-600">
            <button
              onClick={() => handleNavigation("/admin/dashboard/Reports/")}
              className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Report
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Sidebar as absolute overlay on mobile */}
      {isMobileSideBarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute left-0 top-0 h-full w-64 bg-[#F5EE1D] shadow-lg z-50">
            <nav className="flex-1 px-2 pt-[80px] space-y-2 overflow-y-auto">
              <MenuItem
                icon={Home}
                label="Dashboard"
                onClick={() => {
                  handleNavigation("/admin/dashboard");
                  setisMobileSideBarOpen(false); // closes sidebar after navigation
                }}
                isCollapsed={false}
              />
              <MenuItem
                icon={Clock10}
                label="Schedule Ride"
                onClick={() =>
                  handleNavigation("/admin/dashboard/ScheduleRide")
                }
                isCollapsed={false}
              />
              <MenuItem
                icon={Plus}
                label="Add Driver"
                onClick={() => handleNavigation("/admin/dashboard/AddDriver")}
                isCollapsed={false}
              />
              <MenuItem
                icon={Users2}
                label="Drivers"
                onClick={() => handleNavigation("/admin/dashboard/DriverList")}
                isCollapsed={false}
              />
              <MenuItem
                icon={Plus}
                label="Register Vehicle"
                onClick={() =>
                  handleNavigation("/admin/dashboard/RegsiterVehicle")
                }
                isCollapsed={false}
              />
              <MenuItem
                icon={CarTaxiFront}
                label="Vehicles"
                onClick={() => handleNavigation("/admin/dashboard/VehicleList")}
                isCollapsed={false}
              />
              <MenuItem
                icon={SquareChartGantt}
                label="Shift Management"
                onClick={() =>
                  handleNavigation("/admin/dashboard/ShiftManagement")
                }
                isCollapsed={false}
              />
              <MenuItem
                icon={Clock}
                label="Booking History"
                onClick={() => handleNavigation("/admin/dashboard/Bookings")}
                isCollapsed={false}
              />
              <MenuItem
                icon={ListChecksIcon}
                label="Reports"
                onClick={() => handleNavigation("/admin/dashboard/Reports/")}
                isCollapsed={false}
              />
              <MenuItem
                icon={Settings}
                label="Settings"
                onClick={() => handleNavigation("/admin/dashboard/Settings/")}
                isCollapsed={false}
              />
            </nav>
          </div>

          {/* Overlay backdrop to close sidebar */}
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={toggleSideBarMenu}
          ></div>
        </div>
      )}

      {/* Spacing under fixed header for mobile */}
      <div className="h-[72px] md:h-0" />
    </>
  );
}

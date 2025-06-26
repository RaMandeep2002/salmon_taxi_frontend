"use client";
import {
  Home,
  ChevronLeft,
  Plus,
  Users2,
  ListChecksIcon,
  Settings,
  LogOut,
  Menu,
  Clock,
  CarTaxiFront,
  SquareChartGantt,
  Clock10
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../admin/slices/slice/authSlice";
import { toast } from "@/hooks/use-toast";
import { MenuItem } from "./MenuItems";
import { useState } from "react";
import { AppDispatch } from "../store/store";

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`bg-[#F5EF1B] text-white h-screen hidden md:flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-70"
      }`}
    >
      {/* Sidebar Header with Toggle */}  
      <div className="px-4 py-4 flex justify-between items-center border-b border-yellow-600">
        {!isCollapsed && (
          <h2
            className="text-2xl font-bold cursor-pointer text-gray-800 hover:text-gray-900 transition-colors"
            onClick={() => handleNavigation("/admin/dashboard")}
          >
            Salmon Arm Taxi
          </h2>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-2 text-gray-800 hover:bg-yellow-500 rounded-lg transition-colors"
        >
          {isCollapsed ? <Menu /> : <ChevronLeft />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-2 pt-5 space-y-2 overflow-y-auto">
    
        <MenuItem
          icon={Home}
          label={isCollapsed ? "" : "Dashboard"}
          onClick={() => handleNavigation("/admin/dashboard")}
          isCollapsed={isCollapsed}
        />
       
        <MenuItem
          icon={Clock10}
          label={isCollapsed ? "" : "Schedule Ride"}
          onClick={() => handleNavigation("/admin/dashboard/ScheduleRide")}
          isCollapsed={isCollapsed}
        />
        <MenuItem
          icon={Plus}
          label={isCollapsed ? "" : "Add Driver"}
          onClick={() => handleNavigation("/admin/dashboard/AddDriver")}
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          icon={Users2}
          label={isCollapsed ? "" : "Drivers"}
          onClick={() => handleNavigation("/admin/dashboard/DriverList")}
          isCollapsed={isCollapsed}
        />
        <MenuItem
          icon={Plus}
          label={isCollapsed ? "" : "Register Vehicle"}
          onClick={() => handleNavigation("/admin/dashboard/RegsiterVehicle")}
          isCollapsed={isCollapsed}
        />
        <MenuItem
          icon={CarTaxiFront}
          label={isCollapsed ? "" : "Vehicles"}
          onClick={() => handleNavigation("/admin/dashboard/VehicleList")}
          isCollapsed={isCollapsed}
        />
        <MenuItem
          icon={SquareChartGantt}
          label={isCollapsed ? "" : "Shift Management"}
          onClick={() => handleNavigation("/admin/dashboard/ShiftManagement")}
          isCollapsed={isCollapsed}
        />
        <MenuItem
          icon={Clock}
          label={isCollapsed ? "" : "Booking History"}
          onClick={() => handleNavigation("/admin/dashboard/Bookings")}
          isCollapsed={isCollapsed}
        />
        <MenuItem
          icon={ListChecksIcon}
          label={isCollapsed ? "" : "Reports"}
          onClick={() => handleNavigation("/admin/dashboard/Reports/")}
          isCollapsed={isCollapsed}
        />
        <MenuItem
          icon={Settings}
          label={isCollapsed ? "" : "Settings"}
          onClick={() => handleNavigation("/admin/dashboard/Settings/")}
          isCollapsed={isCollapsed}
        />
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-yellow-600">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
        >
          {isCollapsed ? <LogOut /> : "Logout"}
        </button>
      </div>
    </aside>
  );
}

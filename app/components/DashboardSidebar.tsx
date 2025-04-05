"use client";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Plus,
  List,
  Users2,
  ListChecksIcon,
  Settings,
  LogOut,
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
    className={`bg-[#F5EF1B] text-white flex flex-col transition-all duration-300 ${
      isCollapsed ? "w-20" : "w-70"
    }`}
    >
      {/* Sidebar Header with Toggle */}
      <div className="px-6 py-4 flex justify-between items-center">
        {!isCollapsed && (
          <h2
            className="text-2xl font-bold cursor-pointer text-gray-800"
            onClick={() => handleNavigation("/admin/dashboard")}
          >
            Salmon Arm Taxi
          </h2>
        )}
        <button onClick={toggleSidebar} className="p-2 text-gray-800">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 pt-5 space-y-4">
        <MenuItem
          icon={Home}
          label={isCollapsed ? "" : "Dashboard"}
          onClick={() => handleNavigation("/admin/dashboard")}
        />
        <MenuItem
          icon={List}
          label={isCollapsed ? "" : "Booking History"}
          onClick={() =>
            handleNavigation("/admin/DashboardPages/Bookings/BookingHistorys")
          }
        />
        <MenuItem
          icon={Plus}
          label={isCollapsed ? "" : "Add Driver"}
          onClick={() =>
            handleNavigation("/admin/DashboardPages/DriverPage/AddDriver")
          }
        />
        <MenuItem
          icon={Users2}
          label={isCollapsed ? "" : "Users"}
          onClick={() =>
            handleNavigation("/admin/DashboardPages/DriverPage/DriverList")
          }
        />
        <MenuItem
          icon={List}
          label={isCollapsed ? "" : "Driver List with Vehicle"}
          onClick={() =>
            handleNavigation(
              "/admin/DashboardPages/DriverPage/DriverwithVechicle"
            )
          }
        />
        <MenuItem
          icon={ListChecksIcon}
          label={isCollapsed ? "" : "Reports"}
          onClick={() => handleNavigation("/admin/DashboardPages/Reports/")}
        />
        <MenuItem
          icon={Settings}
          label={isCollapsed ? "" : "Settings"}
          onClick={() => handleNavigation("/admin/DashboardPages/Settings/")}
        />
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition"
        >
          {isCollapsed ? <LogOut /> : "Logout"}
        </button>
      </div>
    </aside>
  );
}

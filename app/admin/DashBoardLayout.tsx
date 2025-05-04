"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import HeaderDashboard from "../components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const pathSegments = pathname.split("/").filter(Boolean);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = checking, false = no token

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname,router]);

  if (isAuthenticated === null) {
    return null; // or loading spinner
  }

  if (!isAuthenticated) {
    return null; // fallback in case router.push doesn't finish fast enough
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderDashboard />

        <nav className="shadow-sm p-4 bg-zinc-800">
          <ul className="flex space-x-2 text-white text-sm overflow-x-auto">
            {pathSegments.slice(1).map((segment, index) => {
              const path = `/${pathSegments.slice(0, index + 2).join("/")}`;
              return (
                <li key={path} className="flex items-center whitespace-nowrap">
                  {index > 0 && <span className="mx-2">/</span>}
                  <Link 
                    href={path} 
                    className="hover:text-[#F5EF1B] capitalize transition-colors"
                  >
                    {segment}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-zinc-800">
          <div className="max-w-full mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

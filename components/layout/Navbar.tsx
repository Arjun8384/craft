"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wrench, Plus, ClipboardList, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      show: true,
    },
    {
      href: "/dashboard/tools",
      label: "Tools",
      icon: Wrench,
      show: user?.role === "admin",
    },
    {
      href: "/dashboard/tools/new",
      label: "Add Tool",
      icon: Plus,
      show: user?.role === "admin",
    },
    {
      href: "/dashboard/loans",
      label: "Loans",
      icon: ClipboardList,
      show: true,
    },
  ];

  return (
    <aside className="w-64 min-h-screen border-r bg-white">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Craft Library
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {user?.role === "admin"
            ? "Administrator"
            : "Library Member"}
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {links
          .filter((item) => item.show)
          .map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                    pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </div>
              </Link>
            );
          })}
      </nav>

      <div className="absolute bottom-6 w-64 px-4">
        <Button
          variant="destructive"
          className="w-full"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
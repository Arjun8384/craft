"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Plus,
  ClipboardList,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const { user, logout } = useAuth();

  const links =
    user?.role === "admin"
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
          },
          {
            href: "/dashboard/tools",
            label: "Tools",
            icon: Wrench,
          },
          {
            href: "/dashboard/tools/new",
            label: "Add Tool",
            icon: Plus,
          },
          {
            href: "/dashboard/loans",
            label: "Loans",
            icon: ClipboardList,
          },
        ]
      : [
          {
            href: "/dashboard/tools",
            label: "Available Tools",
            icon: Wrench,
          },
          {
            href: "/dashboard/my-loans",
            label: "My Loans",
            icon: ClipboardList,
          },
        ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white shadow-sm">
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

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
            >
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

      <div className="border-t p-4">
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
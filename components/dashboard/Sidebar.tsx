"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  HandHelping,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tools",
    href: "/dashboard/tools",
    icon: Wrench,
  },
  {
    title: "Lending",
    href: "/dashboard/lending",
    icon: HandHelping,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
      <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white shadow-sm">      <div className="border-b p-6">
        <h1 className="text-xl font-bold">
          Tool Lending
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.title}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
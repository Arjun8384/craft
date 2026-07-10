"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome
        </span>

        <button
          type="button"
          aria-label="Logout"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
        >
          <LogOut size={18} />

          Logout
        </button>
      </div>
    </header>
  );
}
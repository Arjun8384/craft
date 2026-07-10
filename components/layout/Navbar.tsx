"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { logout } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();

  const { user } = useAuth();

  async function handleLogout() {
    try {
      await logout();

      toast.success(
        "Logged out successfully."
      );

      router.replace("/login");
      router.refresh();
    } catch {
      toast.error(
        "Logout failed."
      );
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div>
        <h1 className="text-lg font-semibold">
          Tool Lending System
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">
            {user?.name}
          </p>

          <p className="text-sm text-muted-foreground">
            {user?.role}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          aria-label="Logout"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
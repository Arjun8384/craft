"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const router = useRouter();
    const {
  loading,
  isAuthenticated,
} = useAuth();

if (loading) {
  return null;
}

if (isAuthenticated) {
  router.replace("/dashboard");
  return null;
}
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">      <LoginForm />
    </main>
  );
}
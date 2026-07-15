"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
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
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">      <RegisterForm />
    </main>
  );
}
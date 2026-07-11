import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { requireAuth } from "@/lib/auth";

export default async function LoansLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAuth();

  if (user.role !== "user") {
    redirect("/dashboard");
  }

  return children;
}
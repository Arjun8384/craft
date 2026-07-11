import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { requireAuth } from "@/lib/auth";

export default async function ToolsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAuth();

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return children;
}
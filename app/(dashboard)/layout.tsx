import { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl py-8 px-6">
        {children}
      </main>
    </div>
  );
}
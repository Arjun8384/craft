import { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
"use client";

import { useAuth } from "@/hooks/useAuth";

import { useDashboard } from "@/hooks/useDashboard";
import { useLoans } from "@/hooks/useLoans";
import { useTools } from "@/hooks/useTools";

import StatsCards from "@/components/dashboard/StatsCards";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RecentLoans from "@/components/dashboard/RecentLoans";
import LowStockTools from "@/components/dashboard/LowStockTools";

import DashboardSkeleton from "@/components/ui/DashboardSkeleton";

export default function DashboardPage() {
  const { user } = useAuth();

  const {
    stats,
    loading,
  } = useDashboard();

  const { loans } =
    useLoans();

  const { tools } =
    useTools();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!stats) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Failed to load dashboard.
      </div>
    );
  }

  const isAdmin =
    user?.role === "admin";

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">

          {isAdmin
            ? "Admin Dashboard"
            : "My Dashboard"}

        </h1>

        <p className="mt-2 text-slate-600">

          {isAdmin
            ? "Manage inventory, loans and returns."
            : "Borrow tools and track your current loans."}

        </p>

      </div>

      <StatsCards
        stats={stats}
      />

      <DashboardCharts
        stats={stats}
      />

      {isAdmin ? (

        <LowStockTools
          tools={tools}
        />

      ) : (

        <div className="grid gap-6 lg:grid-cols-2">

          <RecentLoans
            loans={loans}
          />

          <LowStockTools
            tools={tools}
          />

        </div>

      )}

    </div>
  );
}
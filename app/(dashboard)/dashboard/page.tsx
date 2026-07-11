"use client";

import StatsCards from "@/components/dashboard/StatsCards";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RecentLoans from "@/components/dashboard/RecentLoans";
import LowStockTools from "@/components/dashboard/LowStockTools";

import DashboardSkeleton from "@/components/ui/DashboardSkeleton";

import { useDashboard } from "@/hooks/useDashboard";
import { useLoans } from "@/hooks/useLoans";
import { useTools } from "@/hooks/useTools";

export default function DashboardPage() {
  const {
    stats,
    loading,
  } = useDashboard();

  const { loans } = useLoans();
  const { tools } = useTools();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!stats) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="text-grey-700 mt-2">
          Tool Lending Management System
        </p>
      </div>

      <StatsCards
        stats={stats}
      />

      <DashboardCharts
        stats={stats}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentLoans
          loans={loans}
        />

        <LowStockTools
          tools={tools}
        />
      </div>
    </div>
  );
}
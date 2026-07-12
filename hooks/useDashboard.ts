"use client";

import { useEffect, useState } from "react";

import { getDashboardStats } from "@/services/dashboardService";

import type { DashboardStats } from "@/types/dashboard";

export function useDashboard() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);

      const response =
  await getDashboardStats();

setStats(response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  return {
    stats,
    loading,
    refresh: loadDashboard,
  };
}
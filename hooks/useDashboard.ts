"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
} from "@/services/dashboardService";

export function useDashboard() {
  const query = useQuery({
    queryKey: ["dashboard"],

    queryFn: getDashboardStats,

    staleTime: 60000,
  });

  return {
    stats: query.data,

    loading: query.isPending,

    error: query.error,

    refresh: query.refetch,
  };
}
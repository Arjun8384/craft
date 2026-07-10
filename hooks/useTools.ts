"use client";

import { useQuery } from "@tanstack/react-query";
import { getTools } from "@/services/toolService";
import { ITool } from "@/models/Tool";

export function useTools() {
  const query = useQuery<ITool[]>({
    queryKey: ["tools"],
    queryFn: getTools,
    staleTime: 60000,
  });

  return {
    tools: query.data ?? [],
    loading: query.isPending,
    error: query.error,
    refresh: query.refetch,
  };
}
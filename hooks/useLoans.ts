"use client";

import { useQuery } from "@tanstack/react-query";

import { getLoans } from "@/services/loanService";
import { ILoan } from "@/types/loan";

export function useLoans() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<ILoan[]>({
    queryKey: ["loans"],
    queryFn: async () => {
      const response = await getLoans();
      return response.data;
    },
  });

  return {
    loans: data ?? [],
    loading: isLoading,
    error,
    refetch,
  };
}
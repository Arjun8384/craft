"use client";

import { useQuery } from "@tanstack/react-query";
import { getLoans } from "@/services/loanService";
import { ILoan } from "@/models/Loan";

export function useLoans() {
  const query = useQuery<ILoan[]>({
    queryKey: ["loans"],
    queryFn: getLoans,
    staleTime: 60000,
  });

  return {
    loans: query.data ?? [],
    loading: query.isPending,
    error: query.error,
    refresh: query.refetch,
  };
}
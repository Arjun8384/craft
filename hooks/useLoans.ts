"use client";

import { useEffect, useState } from "react";

import { getLoans } from "@/services/loanService";

import { ILoan } from "@/types/loan";

export function useLoans() {
  const [loans, setLoans] =
    useState<ILoan[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadLoans() {
    try {
      setLoading(true);

      const response =
        await getLoans();

      setLoans(response.data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadLoans();
  }, []);

  return {
    loans,
    loading,
    refresh: loadLoans,
  };
}
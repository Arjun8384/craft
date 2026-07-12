"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { ILoan } from "@/types/loan";

import {
  getLoans,
  returnLoan,
} from "@/services/loanService";

import LoanTable from "@/components/loans/LoanTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";

export default function ReturnsPage() {
  const [loans, setLoans] =
    useState<ILoan[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadLoans() {
    try {
      setLoading(true);

      const response =
        await getLoans();

      const borrowedLoans =
        (response.data ?? []).filter(
          (loan) =>
            loan.status ===
            "Borrowed"
        );

      setLoans(borrowedLoans);
    } catch {
      toast.error(
        "Failed to load borrowed tools."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadLoans();
    }, 0);

    return () =>
      clearTimeout(timer);
  }, []);

  async function handleReturn(
    loanId: string
  ) {
    try {
      await returnLoan(loanId);

      toast.success(
        "Tool returned successfully."
      );

      await loadLoans();
    } catch {
      toast.error(
        "Failed to return tool."
      );
    }
  }

  if (loading) {
    return (
      <LoadingSpinner
        message="Loading borrowed tools..."
      />
    );
  }

  if (!loans.length) {
    return (
      <EmptyState
        title="No Borrowed Tools"
        description="There are currently no active borrowed tools."
      />
    );
  }

  return (
    <section className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Return Tools
        </h1>

        <p className="mt-2 text-slate-600">
          Return borrowed tools back
          into inventory.
        </p>

      </div>

      <LoanTable
        loans={loans}
        onReturn={handleReturn}
      />

    </section>
  );
}
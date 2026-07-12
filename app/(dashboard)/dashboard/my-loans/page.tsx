"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";

import LoanTable from "@/components/loans/LoanTable";

import { getLoans } from "@/services/loanService";

import { ILoan } from "@/types/loan";

export default function MyLoansPage() {
  const [loans, setLoans] =
    useState<ILoan[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadLoans() {
    try {
      const response =
        await getLoans();

      setLoans(response.data ?? []);
    } catch {
      toast.error(
        "Failed to load your loans."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  const timer = setTimeout(() => {
    void loadLoans();
  }, 0);

  return () => clearTimeout(timer);
}, []);

  if (loading) {
    return (
      <LoadingSpinner
        message="Loading your loans..."
      />
    );
  }

  return (
    <section className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          My Loans
        </h1>

        <p className="mt-2 text-slate-600">
          View the tools you have borrowed.
        </p>

      </div>

      {loans.length === 0 ? (
        <EmptyState
          title="No Borrowed Tools"
          description="You haven't borrowed any tools yet."
          actionHref="/dashboard/tools"
          actionLabel="Browse Tools"
        />
      ) : (
        <LoanTable
          loans={loans}
        />
      )}

    </section>
  );
}
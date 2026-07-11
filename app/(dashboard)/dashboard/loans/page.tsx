"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";

import LoanTable from "@/components/loans/LoanTable";
import { returnLoan } from "@/services/loanService";
import { getLoans } from "@/services/loanService";
import { ILoan } from "@/types/loan";

export default function LoansPage() {
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLoans() {
    try {
      const response = await getLoans();
      setLoans(response.data ?? []);
    } catch {
      toast.error("Failed to load loans.");
    } finally {
      setLoading(false);
    }
  }

    async function handleReturn(id: string) {
    try {
      await returnLoan(id);

      toast.success("Tool returned successfully.");

      await loadLoans();
    } catch {
      toast.error("Failed to return tool.");
    }
  }

  useEffect(() => {
      const timer = setTimeout(() => {
          void loadLoans();
      }, 0);

      return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading loans..." />;
  }

  return (
    <section className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Borrowed Tools
          </h1>

          <p className="text-slate-600 mt-1">
            Track all borrowed tools.
          </p>
        </div>

        <Link href="/dashboard/loans/new">
          <Button>
            Borrow Tool
          </Button>
        </Link>

      </div>

      {Array.isArray(loans) && loans.length === 0 ? (
        <EmptyState
          title="No Active Loans"
          description="Nobody has borrowed any tools yet."
          actionHref="/dashboard/loans/new"
          actionLabel="Borrow Tool"
        />
      ) : (
        <LoanTable loans={loans} onReturn={handleReturn} />
      )}

    </section>
  );
}
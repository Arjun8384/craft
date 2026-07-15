"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { ILoan } from "@/types/loan";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";

import LoanTable from "@/components/loans/LoanTable";
import LoanStats from "@/components/loans/LoanStats";
import LoanFilters from "@/components/loans/LoanFilters";

import {
  getLoans,
  returnLoan,
} from "@/services/loanService";

export default function LoansPage() {
  const router = useRouter();

  const [loans, setLoans] =
    useState<ILoan[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  async function loadLoans() {
    try {
      setLoading(true);

      const response =
        await getLoans();

      setLoans(response.data ?? []);
    } catch {
      toast.error(
        "Failed to load loans."
      );
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  queueMicrotask(() => {
    void loadLoans();
  });
}, []);

  async function handleReturn(
    id: string
  ) {
    try {
      await returnLoan(id);

      toast.success(
        "Tool returned successfully."
      );

      await loadLoans();

      router.refresh();

      router.replace("/dashboard");
    } catch {
      toast.error(
        "Failed to return tool."
      );
    }
  }

  const activeLoans =
    loans.filter(
      (loan) =>
        loan.status === "Borrowed"
    ).length;

  const returnedLoans =
    loans.filter(
      (loan) =>
        loan.status === "Returned"
    ).length;

  const overdueLoans =
    loans.filter(
      (loan) =>
        loan.status === "Borrowed" &&
        new Date(
          loan.expectedReturnDate
        ) < new Date()
    ).length;

  const borrowedItems =
    loans.reduce(
      (sum, loan) =>
        sum + loan.quantity,
      0
    );

  const filteredLoans =
    useMemo(() => {
      return loans.filter((loan) => {

        const toolName =
          typeof loan.toolId ===
            "object" &&
          loan.toolId
            ? loan.toolId.name
            : "";

        const matchesSearch =
          loan.borrowerName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          loan.borrowerEmail
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          toolName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const overdue =
          loan.status ===
            "Borrowed" &&
          new Date(
            loan.expectedReturnDate
          ) < new Date();

        const matchesStatus =
          status === "all"
            ? true
            : status ===
                "Overdue"
            ? overdue
            : loan.status ===
              status;

        return (
          matchesSearch &&
          matchesStatus
        );
      });
    }, [
      loans,
      search,
      status,
    ]);

  if (loading) {
    return (
      <LoadingSpinner
        message="Loading loans..."
      />
    );
  }

  return (
    <section className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Loan Management
        </h1>

        <p className="mt-2 text-slate-600">
          Manage all borrowed tools.
        </p>

      </div>

      <LoanStats
        active={activeLoans}
        returned={returnedLoans}
        overdue={overdueLoans}
        borrowedItems={
          borrowedItems
        }
      />

      <LoanFilters
        search={search}
        status={status}
        onSearchChange={
          setSearch
        }
        onStatusChange={
          setStatus
        }
      />

      {filteredLoans.length === 0 ? (
        <EmptyState
          title="No Loans Found"
          description="There are no matching loan records."
        />
      ) : (
        <LoanTable
          loans={filteredLoans}
          onReturn={handleReturn}
        />
      )}

    </section>
  );
}
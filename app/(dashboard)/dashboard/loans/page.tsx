"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { returnLoan } from "@/services/loanService";
import { useLoans } from "@/hooks/useLoans";

import LoanTable from "@/components/loans/LoanTable";
import ReturnDialog from "@/components/loans/ReturnDialog";

import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/ui/TableSkeleton";
import LoanSearch from "@/components/loans/LoanSearch";
import LoanFilters from "@/components/loans/LoanFilters";
import Pagination from "@/components/ui/Pagination";

export default function LoansPage() {
  const router = useRouter();

  const [selectedLoan, setSelectedLoan] =
    useState<string | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [returning, setReturning] =
    useState(false);

const {
  loans,
  loading,

  search,
  setSearch,

  status,
  setStatus,

  page,
  setPage,

  pagination,

  refresh,
} = useLoans();

  function openReturnDialog(id: string) {
    setSelectedLoan(id);
    setDialogOpen(true);
  }

  async function handleReturn() {
    if (!selectedLoan) return;

    try {
      setReturning(true);

      await returnLoan(selectedLoan);

      toast.success("Tool returned successfully.");

      setDialogOpen(false);
      setSelectedLoan(null);

      await refresh();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to return tool.");
    } finally {
      setReturning(false);
    }
  }

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Lending Management
        </h1>

        <Link href="/dashboard/loans/new">
          <Button>
            Borrow Tool
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <LoanSearch
            value={search}
            onChange={setSearch}
        />

        <LoanFilters
            value={status}
            onChange={setStatus}
        />
        </div>

      <LoanTable
        loans={loans}
        onReturn={async (id) => {
          openReturnDialog(id);
        }}
      />

      <Pagination
        page={page}
        totalPages={pagination.totalPages}
        hasNext={pagination.hasNext}
        hasPrev={pagination.hasPrev}
        onPageChange={setPage}
        />

      <ReturnDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleReturn}
        loading={returning}
      />
    </div>
  );
}
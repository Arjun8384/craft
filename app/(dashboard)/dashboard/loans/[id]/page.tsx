"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { getLoan } from "@/services/loanService";
import { ILoan } from "@/types/loan";
import { ITool } from "@/types/tool";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

function isTool(
  tool: ILoan["toolId"]
): tool is ITool {
  return (
    typeof tool === "object" &&
    tool !== null
  );
}

export default function LoanDetailsPage({
  params,
}: Props) {
  const { id } = use(params);

  const [loan, setLoan] =
    useState<ILoan | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchLoan() {
      try {
        const response =
          await getLoan(id);

        setLoan(response.data);
      } catch {
        toast.error(
          "Failed to load loan."
        );
      } finally {
        setLoading(false);
      }
    }

    void fetchLoan();
  }, [id]);

  if (loading) {
    return (
      <LoadingSpinner message="Loading loan..." />
    );
  }

  if (!loan) {
    return (
      <EmptyState
        title="Loan Not Found"
        description="The requested loan does not exist."
      />
    );
  }

  const toolName = isTool(loan.toolId)
    ? loan.toolId.name
    : "Unknown Tool";

  return (
    <section className="mx-auto max-w-4xl space-y-6">

      <div className="flex items-center justify-between">

        <Link href="/dashboard/loans">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Loan Details
          </h1>

          <p className="mt-2 text-slate-600">
            Complete information about this borrowing record.
          </p>

        </div>

        <Separator />

        <div className="grid gap-6 sm:grid-cols-2">

          <div>
            <p className="text-sm text-slate-500">
              Borrower
            </p>

            <p className="font-semibold">
              {loan.borrowerName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="font-semibold">
              {loan.borrowerEmail}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Phone
            </p>

            <p className="font-semibold">
              {loan.borrowerPhone}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Tool
            </p>

            <p className="font-semibold">
              {toolName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Quantity
            </p>

            <p className="font-semibold">
              {loan.quantity}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Borrow Date
            </p>

            <p className="font-semibold">
              {new Date(
                loan.borrowDate
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Expected Return
            </p>

            <p className="font-semibold">
              {new Date(
                loan.expectedReturnDate
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Actual Return
            </p>

            <p className="font-semibold">
              {loan.actualReturnDate
                ? new Date(
                    loan.actualReturnDate
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <Badge
              variant={
                loan.status === "Returned"
                  ? "secondary"
                  : "default"
              }
            >
              {loan.status}
            </Badge>
          </div>

        </div>

      </div>

    </section>
  );
}
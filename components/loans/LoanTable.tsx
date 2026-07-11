"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { ILoan } from "@/types/loan";

import EmptyState from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LoanTableProps {
  loans: ILoan[];
  onReturn: (id: string) => Promise<void>;
}

export default function LoanTable({
  loans,
  onReturn,
}: LoanTableProps) {
  if (loans.length === 0) {
    return (
      <EmptyState
        title="No Borrow Records"
        description="No borrowed tools found."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Borrower</th>
            <th className="px-4 py-3 text-left">Tool</th>
            <th className="px-4 py-3 text-left">Qty</th>
            <th className="px-4 py-3 text-left">Borrowed</th>
            <th className="px-4 py-3 text-left">Due</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan._id.toString()}
              className="border-t"
            >
              <td className="px-4 py-4">
                {loan.borrowerName}
              </td>

              <td className="px-4 py-4">
                {loan.toolName}
              </td>

              <td className="px-4 py-4">
                {loan.quantity}
              </td>

              <td className="px-4 py-4">
                {new Date(
                  loan.borrowDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-4">
                {new Date(
                  loan.returnDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-4">
                <Badge
                  variant={
                    loan.status === "Borrowed"
                      ? "default"
                      : "secondary"
                  }
                >
                  {loan.status}
                </Badge>
              </td>

              <td className="px-4 py-4 text-right">
                <div className="flex justify-end gap-2">

                  {loan.status === "Borrowed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onReturn(loan._id.toString())
                      }
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Return
                    </Button>
                  )}

                  <Link
                    href={`/dashboard/loans/${loan._id}`}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                    >
                      View
                    </Button>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
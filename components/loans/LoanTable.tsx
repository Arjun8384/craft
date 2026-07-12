"use client";

import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import EmptyState from "@/components/common/EmptyState";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ReturnConfirmationDialog from "@/components/loans/ReturnConfirmationDialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ILoan } from "@/types/loan";
import { ITool } from "@/types/tool";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  loans: ILoan[];
  onReturn: (
    id: string
  ) => Promise<void>;
}

function isTool(
  tool: ILoan["toolId"]
): tool is ITool {
  return (
    typeof tool === "object" &&
    tool !== null
  );
}

export default function LoanTable({
  loans,
  onReturn,
}: Props) {
  const {
    user,
    loading: authLoading,
  } = useAuth();

  const isAdmin =
    user?.role === "admin";

  const [selectedLoan, setSelectedLoan] =
    useState<ILoan | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  if (authLoading) {
    return (
      <LoadingSpinner message="Loading..." />
    );
  }

  async function confirmReturn() {
    if (!selectedLoan) return;

    try {
      setLoading(true);

      await onReturn(selectedLoan._id);

      setDialogOpen(false);
      setSelectedLoan(null);
    } finally {
      setLoading(false);
    }
  }

  function openDialog(
    loan: ILoan
  ) {
    setSelectedLoan(loan);
    setDialogOpen(true);
  }

  if (!loans.length) {
    return (
      <EmptyState
        title="No Borrow Records"
        description="There are no active borrowed tools."
      />
    );
  }

  return (
    <>
      <ReturnConfirmationDialog
        open={dialogOpen}
        loading={loading}
        borrower={
          selectedLoan?.borrowerName ??
          ""
        }
        tool={
          selectedLoan &&
          isTool(selectedLoan.toolId)
            ? selectedLoan.toolId.name
            : ""
        }
        quantity={
          selectedLoan?.quantity ?? 0
        }
        onConfirm={confirmReturn}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setSelectedLoan(null);
          }
        }}
      />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                Borrower
              </TableHead>

              <TableHead>
                Tool
              </TableHead>

              <TableHead>
                Quantity
              </TableHead>

              <TableHead>
                Borrowed
              </TableHead>

              <TableHead>
                Due
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              {isAdmin && (
                <TableHead className="text-right">
                  Action
                </TableHead>
              )}

            </TableRow>

          </TableHeader>

          <TableBody>

            {loans.map((loan) => {

              const toolName =
                isTool(loan.toolId)
                  ? loan.toolId.name
                  : "Unknown Tool";

              return (

                <TableRow
                  key={loan._id}
                >

                  <TableCell className="font-medium">
                    {loan.borrowerName}
                  </TableCell>

                  <TableCell>
                    {toolName}
                  </TableCell>

                  <TableCell>
                    {loan.quantity}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      loan.borrowDate
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      loan.expectedReturnDate
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>

                    <Badge
                      variant={
                        loan.status ===
                        "Returned"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {loan.status}
                    </Badge>

                  </TableCell>

                  {isAdmin && (

                    <TableCell className="text-right">

                      {loan.status ===
                      "Borrowed" ? (

                        <Button
                          size="sm"
                          onClick={() =>
                            openDialog(
                              loan
                            )
                          }
                        >
                          Return
                        </Button>

                      ) : (

                        <span className="text-sm text-slate-400">
                          Returned
                        </span>

                      )}

                    </TableCell>

                  )}

                </TableRow>

              );
            })}

          </TableBody>

        </Table>

      </div>
    </>
  );
}
"use client";

import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import EmptyState from "@/components/common/EmptyState";
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

interface LoanTableProps {
  loans: ILoan[];
  onReturn?: (
    id: string
  ) => Promise<void>;
  showActions?: boolean;
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
  showActions = false,
}: LoanTableProps) {
  const { user } = useAuth();

  const [selectedLoan, setSelectedLoan] = useState<ILoan | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  async function confirmReturn() {
    if (!selectedLoan) return;

    setLoading(true);

    try {
      if(onReturn) {
      await onReturn(selectedLoan._id);}
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  if (!loans.length) {
    return (
      <EmptyState
        title="No Borrow Records"
        description="No tools have been borrowed yet."
      />
    );
  }

  return (
    <>
      {selectedLoan && (
        <ReturnConfirmationDialog
          open={open}
          loading={loading}
          borrower={
            selectedLoan.borrowerName
          }
          tool={
            isTool(selectedLoan.toolId)
              ? selectedLoan.toolId.name
              : "Unknown Tool"
          }
          quantity={
            selectedLoan.quantity
          }
          onConfirm={confirmReturn}
          onOpenChange={setOpen}
        />
      )}

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
                Qty
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

              {showActions &&
                  user?.role === "admin" && (
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
                <TableRow key={loan._id}>

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

                  {user?.role ===
                    "admin" && (
                    <TableCell className="text-right">

                      {loan.status ===
                        "Borrowed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedLoan(loan);
                            setOpen(true);
                          }}                           
                        >
                          Return
                        </Button>
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
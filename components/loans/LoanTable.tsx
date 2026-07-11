"use client";

import { useAuth } from "@/hooks/useAuth";

import EmptyState from "@/components/common/EmptyState";
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
}: LoanTableProps) {
  const { user } = useAuth();

  if (loans.length === 0) {
    return (
      <EmptyState
        title="No Borrow Records"
        description="No tools have been borrowed yet."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Borrower</TableHead>

            <TableHead>Tool</TableHead>

            <TableHead>Qty</TableHead>

            <TableHead>Borrowed</TableHead>

            <TableHead>Due</TableHead>

            <TableHead>Status</TableHead>

            {user?.role === "admin" && (
              <TableHead className="text-right">
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loans.map((loan) => {
            const toolName = isTool(
              loan.toolId
            )
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

                {user?.role === "admin" && (
                  <TableCell className="text-right">
                    {loan.status ===
                      "Borrowed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          onReturn(loan._id)
                        }
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
  );
}
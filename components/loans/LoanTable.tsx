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

            <TableHead className="text-center">
              Qty
            </TableHead>

            <TableHead>
              Borrowed
            </TableHead>

            <TableHead>
              Due Date
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            {user?.role === "admin" && (
              <TableHead className="text-right">
                Action
              </TableHead>
            )}

          </TableRow>
        </TableHeader>

        <TableBody>

          {loans.map((loan) => {

            const tool =
              isTool(loan.toolId)
                ? loan.toolId
                : null;

            const overdue =
              loan.status === "Borrowed" &&
              new Date(
                loan.expectedReturnDate
              ) < new Date();

            return (
              <TableRow key={loan._id}>

                <TableCell>

                  <div className="font-medium">
                    {loan.borrowerName}
                  </div>

                  <div className="text-xs text-slate-500">
                    {loan.borrowerEmail}
                  </div>

                </TableCell>

                <TableCell>

                  <div className="font-medium">
                    {tool?.name ??
                      "Unknown Tool"}
                  </div>

                  {tool?.category && (
                    <div className="text-xs text-slate-500">
                      {tool.category}
                    </div>
                  )}

                </TableCell>

                <TableCell className="text-center font-medium">
                  {loan.quantity}
                </TableCell>

                <TableCell>
                  {new Date(
                    loan.borrowDate
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell>

                  <span
                    className={
                      overdue
                        ? "font-medium text-red-600"
                        : ""
                    }
                  >
                    {new Date(
                      loan.expectedReturnDate
                    ).toLocaleDateString()}
                  </span>

                </TableCell>

                <TableCell>

                  {overdue ? (
                    <Badge variant="destructive">
                      Overdue
                    </Badge>
                  ) : (
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
                  )}

                </TableCell>

                {user?.role === "admin" && (

                  <TableCell className="text-right">

                    {loan.status ===
                      "Borrowed" && (

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          onReturn(
                            loan._id
                          )
                        }
                      >
                        Mark Returned
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
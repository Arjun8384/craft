"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { ILoan } from "@/models/Loan";
import EmptyState from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface LoanTableProps {
  loans: ILoan[];

  onReturn: (
    id: string
  ) => Promise<void>;
}

export default function LoanTable({
  loans,
  onReturn,
}: LoanTableProps) {
  if (!loans.length) {
    return (
      <EmptyState
      title="No Borrow Records"
      description="No tools have been borrowed yet."
    />
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Borrower
            </TableHead>

            <TableHead>
              Email
            </TableHead>

            <TableHead>
              Quantity
            </TableHead>

            <TableHead>
              Borrow Date
            </TableHead>

            <TableHead>
              Return Date
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loans.map((loan) => (
            <TableRow
              key={loan._id.toString()}
            >
              <TableCell>
                {loan.borrowerName}
              </TableCell>

              <TableCell>
                {loan.borrowerEmail}
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
                {loan.actualReturnDate
                  ? new Date(
                      loan.actualReturnDate
                    ).toLocaleDateString()
                  : "-"}
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

              <TableCell>
                <div className="flex justify-end gap-2">
                  {loan.status ===
                    "Borrowed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label={`Return tool borrowed by ${loan.borrowerName}`}
                      onClick={() =>
                        onReturn(
                          loan._id.toString()
                        )
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { IToolBorrower } from "@/types/tool";

interface Props {
  title: string;
  loans: IToolBorrower[];
  active?: boolean;
  isAdmin?: boolean;
  onReturn?: (loanId: string) => void;
}

export default function ToolBorrowHistory({
  title,
  loans,
  active = false,
  isAdmin = false,
  onReturn,
}: Props) {
  return (
    <section className="space-y-4">

      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      {!loans.length ? (
        <div className="rounded-lg border bg-slate-50 p-6 text-center text-slate-500">
          No records found.
        </div>
      ) : (
        <div className="space-y-3">

          {loans.map((loan) => (
            <div
              key={loan._id}
              className="flex items-center justify-between rounded-lg border bg-white p-4"
            >
              <div className="space-y-1">

                <p className="font-semibold">
                  {loan.borrowerName}
                </p>

                {loan.borrowerEmail && (
                  <p className="text-sm text-slate-500">
                    {loan.borrowerEmail}
                  </p>
                )}

                <p className="text-sm text-slate-500">
                  Quantity : {loan.quantity}
                </p>

                {loan.borrowDate && (
                  <p className="text-sm text-slate-500">
                    Borrowed :{" "}
                    {new Date(
                      loan.borrowDate
                    ).toLocaleDateString()}
                  </p>
                )}

                {loan.expectedReturnDate && (
                  <p className="text-sm text-slate-500">
                    Due :{" "}
                    {new Date(
                      loan.expectedReturnDate
                    ).toLocaleDateString()}
                  </p>
                )}

                <p className="text-sm">
                  Status :{" "}
                  <span className="font-medium">
                    {loan.status}
                  </span>
                </p>

              </div>

              {active &&
                isAdmin &&
                loan.status === "Borrowed" &&
                onReturn && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onReturn(loan._id)
                    }
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Return
                  </Button>
                )}

            </div>
          ))}

        </div>
      )}

    </section>
  );
}
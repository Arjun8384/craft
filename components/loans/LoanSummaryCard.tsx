"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ILoan } from "@/types/loan";
import { ITool } from "@/types/tool";

interface Props {
  loan: ILoan;
}

function isTool(
  tool: ILoan["toolId"]
): tool is ITool {
  return (
    typeof tool === "object" &&
    tool !== null
  );
}

export default function LoanSummaryCard({
  loan,
}: Props) {
  const toolName = isTool(
    loan.toolId
  )
    ? loan.toolId.name
    : "Unknown Tool";

  return (
    <div className="rounded-xl border bg-white p-8 shadow-sm">

      <div className="space-y-6">

        <div>

          <h2 className="text-2xl font-bold">
            {toolName}
          </h2>

          <p className="text-slate-500">
            Loan Information
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
              Status
            </p>

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

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Returned On
            </p>

            <p className="font-semibold">
              {loan.actualReturnDate
                ? new Date(
                    loan.actualReturnDate
                  ).toLocaleDateString()
                : "-"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
"use client";

import { ILoan } from "@/models/Loan";
import { ITool } from "@/models/Tool";

interface Props {
  loans: ILoan[];
}

function isTool(
  tool: ILoan["toolId"]
): tool is ITool {
  return (
    typeof tool === "object" &&
    tool !== null &&
    "name" in tool
  );
}

export default function RecentLoans({
  loans,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="font-semibold">
          Recent Loans
        </h2>
      </div>

      <div className="divide-y">
        {loans.length === 0 ? (
          <div className="p-8 text-center text-grey-700">
            No recent loans.
          </div>
        ) : (
          loans.map((loan) => (
            <div
              key={String(loan._id)}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">
                  {isTool(loan.toolId)
                    ? loan.toolId.name
                    : "Unknown Tool"}
                </p>

                <p className="text-sm text-grey-700">
                  {loan.borrowerName}
                </p>
              </div>

              <span className="rounded bg-blue-100 px-3 py-1 text-xs">
                {loan.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
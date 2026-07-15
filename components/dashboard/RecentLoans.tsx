import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ILoan } from "@/types/loan";
import { ITool } from "@/types/tool";

interface Props {
  loans: ILoan[];
}

function isTool(
  tool: ILoan["toolId"]
): tool is ITool {
  return (
    typeof tool === "object" &&
    tool !== null
  );
}

export default function RecentLoans({
  loans,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b p-4 flex items-center justify-between">

        <h2 className="font-semibold">
          Recent Loans
        </h2>

        <Link href="/dashboard/loans">
          <Button
            size="sm"
            variant="outline"
          >
            View All
          </Button>
        </Link>

      </div>

      <div className="divide-y">

        {loans.length === 0 ? (

          <div className="p-8 text-center text-slate-500">
            No recent loans.
          </div>

        ) : (

          loans.map((loan) => (

            <div
              key={loan._id}
              className="flex items-center justify-between p-4"
            >

              <div>

                <p className="font-medium">
                  {isTool(loan.toolId)
                    ? loan.toolId.name
                    : "Unknown Tool"}
                </p>

                <p className="text-sm text-slate-500">
                  {loan.borrowerName}
                </p>

              </div>

              <div className="flex items-center gap-3">

                <Badge>
                  {loan.status}
                </Badge>

                <Link
                  href={`/dashboard/loans/${loan._id}`}
                >
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    Details
                  </Button>
                </Link>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}
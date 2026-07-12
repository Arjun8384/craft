"use client";

interface Loan {
  borrowerName: string;
  borrowerEmail?: string;
  quantity: number;
  borrowDate?: string;
  expectedReturnDate?: string;
  status?: string;
}

interface Props {
  title: string;
  loans: Loan[];
  active?: boolean;
}

export default function ToolBorrowHistory({
  title,
  loans,
  active = false,
}: Props) {
  return (
    <div className="space-y-3">

      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      {loans.length === 0 ? (
        <p className="text-sm text-slate-500">
          No records found.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border">

          {loans.map((loan, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b p-4 last:border-b-0"
            >
              <div>

                <p className="font-medium">
                  {loan.borrowerName}
                </p>

                {loan.borrowerEmail && (
                  <p className="text-xs text-slate-500">
                    {loan.borrowerEmail}
                  </p>
                )}

              </div>

              <div className="text-right">

                <p className="font-medium">
                  Qty {loan.quantity}
                </p>

                {active ? (
                  <p className="text-xs text-slate-500">
                    Due{" "}
                    {new Date(
                      loan.expectedReturnDate!
                    ).toLocaleDateString()}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    {loan.status}
                  </p>
                )}

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
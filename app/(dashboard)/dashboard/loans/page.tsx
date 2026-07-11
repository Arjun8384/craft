"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function LoansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Lending Management
          </h1>

          <p className="text-grey-700">
            Manage borrowed tools.
          </p>
        </div>

        <Link href="/dashboard/loans/new">
          <Button>
            Borrow Tool
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-8">
        <p className="text-grey-700">
          Loan management is temporarily
          disabled while preparing the
          production build.
        </p>
      </div>
    </div>
  );
}
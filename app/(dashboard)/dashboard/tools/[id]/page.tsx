"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Pencil,
} from "lucide-react";

import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";

import { getTool } from "@/services/toolService";

import ToolBorrowHistory from "@/components/tools/ToolBorrowHistory";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { returnLoan } from "@/services/loanService";

import {
  ITool,
  IToolBorrower,
} from "@/types/tool";

interface ToolDetails extends ITool {
  borrowedQuantity: number;
  currentBorrowers: IToolBorrower[];
  borrowHistory: IToolBorrower[];
}

interface ToolDetails extends ITool {
  borrowedQuantity: number;
  currentBorrowers: IToolBorrower[];
  borrowHistory: IToolBorrower[];
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ToolDetailsPage({
  params,
}: Props) {
const { id } = use(params);

const { user, loading: authLoading } =
  useAuth();

const [tool, setTool] =
  useState<ToolDetails | null>(null);

const [loading, setLoading] =
  useState(true);

const router = useRouter();

useEffect(() => {
  queueMicrotask(async () => {
    try {
      const response = await getTool(id);
      setTool(response.data);
    } catch {
      toast.error("Failed to load tool.");
    } finally {
      setLoading(false);
    }
  });
}, [id]);

if (loading || authLoading) {
  return (
    <LoadingSpinner
      message="Loading tool..."
    />
  );
}

  if (!tool) {
    return (
      <EmptyState
        title="Tool Not Found"
        description="The requested tool does not exist."
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl space-y-6">

<div className="flex items-center justify-between">

  <Link href="/dashboard/tools">
    <Button variant="outline">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  </Link>

  {user?.role?.toLowerCase() === "admin" ? (
    <Link
      href={`/dashboard/tools/${tool._id}/edit`}
    >
      <Button>
        <Pencil className="mr-2 h-4 w-4" />
        Edit Tool
      </Button>
    </Link>
  ) : (
    Number(tool.availableQuantity) > 0 && (
      <Link
        href={`/dashboard/loans/new?tool=${tool._id}`}
      >
        <Button>
          Borrow Tool
        </Button>
      </Link>
    )
  )}

</div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <div className="space-y-6">

          <div>

            <h1 className="text-3xl font-bold">
              {tool.name}
            </h1>

            <p className="mt-2 text-slate-500">
              {tool.category}
            </p>

          </div>

          <div className="flex gap-3">

            <Badge>
              {tool.status}
            </Badge>

            <Badge variant="secondary">
              {tool.condition}
            </Badge>

          </div>

          <Separator />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <div>
              <p className="text-sm text-slate-500">
                Total Quantity
              </p>

              <p className="text-2xl font-semibold">
                {tool.quantity}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Available
              </p>

              <p className="text-2xl font-semibold text-green-600">
                {tool.availableQuantity}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Borrowed
              </p>

              <p className="text-2xl font-semibold text-orange-600">
                {tool.borrowedQuantity}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Location
              </p>

              <p className="font-semibold">
                {tool.location}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Category
              </p>

              <p className="font-semibold">
                {tool.category}
              </p>
            </div>

          </div>

          <Separator />

<ToolBorrowHistory
  title="Current Borrowers"
  loans={tool.currentBorrowers}
  active
  isAdmin={
    user?.role?.toLowerCase() === "admin"
  }
  onReturn={async (loanId) => {
  try {
    await returnLoan(loanId);

    toast.success(
      "Tool returned successfully."
    );

    const response =
      await getTool(id);

    setTool(response.data);

    router.refresh();
  } catch {
    toast.error(
      "Failed to return tool."
    );
  }
}}
/>

<Separator />

<ToolBorrowHistory
  title="Borrow History"
  loans={tool.borrowHistory}
/>

          <div>

            <h2 className="mb-2 text-lg font-semibold">
              Description
            </h2>

            <p className="leading-7 text-slate-600">
              {tool.description}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
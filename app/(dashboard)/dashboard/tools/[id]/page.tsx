"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { toast } from "sonner";

import { ITool } from "@/types/tool";
import { getTool } from "@/services/toolService";

import ToolBorrowHistory from "@/components/tools/ToolBorrowHistory";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import Image from "next/image";

interface ToolBorrower {
  borrowerName: string;
  borrowerEmail: string;
  quantity: number;
  expectedReturnDate: string;
  status: string;
}

interface ToolDetails extends ITool {
  borrowedQuantity: number;
  currentBorrowers: ToolBorrower[];
  borrowHistory: ToolBorrower[];
}

interface ToolDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ToolDetailsPage({
  params,
}: ToolDetailsPageProps) {
  const { id } = use(params);

  const [tool, setTool] =
    useState<ToolDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchTool() {
      try {
        const response =
          await getTool(id);

        setTool(response.data);
      } catch {
        toast.error(
          "Failed to load tool."
        );
      } finally {
        setLoading(false);
      }
    }

    void fetchTool();
  }, [id]);

  if (loading) {
    return (
      <LoadingSpinner message="Loading tool..." />
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

        <Link
          href={`/dashboard/tools/${tool._id}/edit`}
        >
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Tool
          </Button>
        </Link>

      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* Future Tool Image */}

          {/*

          <Image
            src={tool.image || "/placeholder-tool.png"}
            alt={tool.name}
            width={260}
            height={260}
            className="rounded-xl border object-cover"
          />

          */}

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
            />

            <Separator />

            <ToolBorrowHistory
              title="Borrow History"
              loans={tool.borrowHistory}
            />

            <Separator />

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

      </div>

    </section>
  );
}
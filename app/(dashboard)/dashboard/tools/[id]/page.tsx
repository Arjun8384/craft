"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { toast } from "sonner";

import { ITool } from "@/types/tool";
import { getTool } from "@/services/toolService";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface ToolDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ToolDetailsPage({
  params,
}: ToolDetailsPageProps) {
  const { id } = use(params);

  const [tool, setTool] = useState<ITool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTool() {
      try {
        const response = await getTool(id);
        setTool(response.data);
      } catch {
        toast.error("Failed to load tool.");
      } finally {
        setLoading(false);
      }
    }

    fetchTool();
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
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/tools">
          <Button
            variant="outline"
            aria-label="Back to tool list"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <Link
          href={`/dashboard/tools/${tool._id}/edit`}
        >
          <Button
            aria-label={`Edit ${tool.name}`}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Tool
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-background p-8">
        <div className="grid gap-8 md:grid-cols-[260px_1fr]">
          <div>
            <Image
              src={
                tool.image ||
                "/placeholder-tool.png"
              }
              alt={tool.name}
              className="aspect-square w-full rounded-lg border object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {tool.name}
              </h1>

              <p className="mt-2 text-muted-foreground">
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

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Quantity
                </p>

                <p className="text-lg font-semibold">
                  {tool.quantity}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Available Quantity
                </p>

                <p className="text-lg font-semibold">
                  {tool.availableQuantity}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Location
                </p>

                <p className="text-lg font-semibold">
                  {tool.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Category
                </p>

                <p className="text-lg font-semibold">
                  {tool.category}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="mb-2 text-lg font-semibold">
                Description
              </h2>

              <p className="leading-7 text-muted-foreground">
                {tool.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
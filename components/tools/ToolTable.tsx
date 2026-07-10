"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { ITool } from "@/types/tool";

import EmptyState from "@/components/common/EmptyState";
import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ToolTableProps {
  tools: ITool[];
  onDelete: (id: string) => Promise<void>;
}

function getStatusVariant(status: string) {
  switch (status) {
    case "Available":
      return "default";

    case "Borrowed":
      return "secondary";

    case "Maintenance":
      return "destructive";

    default:
      return "outline";
  }
}

function getConditionVariant(condition: string) {
  switch (condition) {
    case "Excellent":
      return "default";

    case "Good":
      return "secondary";

    case "Fair":
      return "outline";

    case "Damaged":
      return "destructive";

    default:
      return "outline";
  }
}

export default function ToolTable({
  tools,
  onDelete,
}: ToolTableProps) {
  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    if (!selectedId) return;

    try {
      setLoading(true);

      await onDelete(selectedId);

      setDialogOpen(false);
      setSelectedId(null);
    } finally {
      setLoading(false);
    }
  }

  if (!tools.length) {
    return (
      <EmptyState
        title="No Tools Found"
        description="There are currently no tools in inventory."
        actionLabel="Add Tool"
        actionHref="/dashboard/tools/new"
      />
    );
  }

  return (
    <>
      <DeleteConfirmationDialog
        open={dialogOpen}
        loading={loading}
        onOpenChange={setDialogOpen}
        onConfirm={handleDelete}
      />

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tools.map((tool) => (
              <TableRow key={tool._id}>
                <TableCell className="font-medium">
                  {tool.name}
                </TableCell>

                <TableCell>
                  {tool.category}
                </TableCell>

                <TableCell>
                  {tool.quantity}
                </TableCell>

                <TableCell>
                  {tool.availableQuantity}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={getConditionVariant(
                      tool.condition
                    )}
                  >
                    {tool.condition}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={getStatusVariant(
                      tool.status
                    )}
                  >
                    {tool.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      aria-label={`View ${tool.name}`}
                    >
                      <Link
                        href={`/dashboard/tools/${tool._id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      size="icon"
                      variant="secondary"
                      aria-label={`Edit ${tool.name}`}
                    >
                      <Link
                        href={`/dashboard/tools/${tool._id}/edit`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      aria-label={`Delete ${tool.name}`}
                      onClick={() => {
                        setSelectedId(tool._id);
                        setDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
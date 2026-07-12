"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import type { ITool } from "@/types/tool";

import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";
import EmptyState from "@/components/common/EmptyState";

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

interface Props {
  tools: ITool[];
  onDelete: (
    id: string
  ) => Promise<void>;
}

export default function ToolTable({
  tools,
  onDelete,
}: Props) {
  const { user } = useAuth();

  const isAdmin =
    user?.role === "admin";

  const [selectedId, setSelectedId] =
    useState<string>();

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function confirmDelete() {
    if (!selectedId) return;

    setLoading(true);

    await onDelete(selectedId);

    setLoading(false);

    setOpen(false);
  }

  if (!tools.length) {
    return (
      <EmptyState
        title="No Tools Found"
        description="No tools are available."
        actionHref={
          isAdmin
            ? "/dashboard/tools/new"
            : undefined
        }
        actionLabel={
          isAdmin
            ? "Add Tool"
            : undefined
        }
      />
    );
  }

  return (
    <>
      <DeleteConfirmationDialog
        open={open}
        loading={loading}
        onOpenChange={setOpen}
        onConfirm={confirmDelete}
      />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Condition</TableHead>

              {isAdmin && (
                <TableHead>
                  Total
                </TableHead>
              )}

              <TableHead>
                Available
              </TableHead>

              <TableHead>
                Location
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tools.map((tool) => (
              <TableRow
                key={String(tool._id)}
              >
                <TableCell className="font-medium">
                  {tool.name}
                </TableCell>

                <TableCell>
                  {tool.category}
                </TableCell>

                <TableCell>
                  {tool.condition}
                </TableCell>

                {isAdmin && (
                  <TableCell>
                    {tool.quantity}
                  </TableCell>
                )}

                <TableCell>
                  {tool.availableQuantity}
                </TableCell>

                <TableCell>
                  {tool.location}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      tool.availableQuantity === 0
                        ? "destructive"
                        : tool.availableQuantity <= 2
                        ? "secondary"
                        : "default"
                    }
                  >
                    {tool.availableQuantity === 0
                      ? "Out of Stock"
                      : tool.availableQuantity <= 2
                      ? "Low Stock"
                      : "Available"}
                  </Badge>
                </TableCell>

                <TableCell>
<div className="flex justify-end gap-2">

  {/* Everyone can view details */}
  <Link
    href={`/dashboard/tools/${tool._id}`}
  >
    <Button
      variant="outline"
      size="icon"
      aria-label={`View ${tool.name}`}
    >
      <Eye className="h-4 w-4" />
    </Button>
  </Link>

  {isAdmin ? (
    <>
      <Link
        href={`/dashboard/tools/${tool._id}/edit`}
      >
        <Button
          variant="secondary"
          size="icon"
          aria-label={`Edit ${tool.name}`}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>

      <Button
        variant="destructive"
        size="icon"
        aria-label={`Delete ${tool.name}`}
        onClick={() => {
          setSelectedId(String(tool._id));
          setOpen(true);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </>
  ) : (
    <Link
      href={`/dashboard/loans/new?tool=${tool._id}`}
    >
      <Button
        disabled={tool.availableQuantity <= 0}
      >
        {tool.availableQuantity > 0
          ? "Borrow"
          : "Out of Stock"}
      </Button>
    </Link>
  )}

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
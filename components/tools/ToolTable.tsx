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
  onDelete: (id: string) => Promise<void>;
}

export default function ToolTable({
  tools,
  onDelete,
}: Props) {

  const { role } = useAuth();

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
        title="No Tools"
        description="No tools found."
        actionLabel="Add Tool"
        actionHref="/dashboard/tools/new"
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

      <div className="rounded-xl border bg-white shadow-sm">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>Name</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Total</TableHead>

              <TableHead>Available</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="text-right">
                Actions
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {tools.map((tool) => (

              <TableRow key={String(tool._id)}>

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

                  <Badge>

                    {tool.status}

                  </Badge>

                </TableCell>

                <TableCell>

                  <div className="flex justify-end gap-2">

                    <Link
                      href={`/dashboard/tools/${tool._id}`}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                      >
                        <Eye className="h-4 w-4"/>
                      </Button>
                    </Link>

                    {role === "admin" && (
                      <>
                        <Link
                          href={`/dashboard/tools/${tool._id}/edit`}
                        >
                          <Button
                            variant="secondary"
                            size="icon"
                          >
                            <Pencil className="h-4 w-4"/>
                          </Button>
                        </Link>

                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={()=>{
                            setSelectedId(
                              String(tool._id)
                            );

                            setOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </>
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
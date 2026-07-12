"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  loading: boolean;
  borrower: string;
  tool: string;
  quantity: number;
  onConfirm: () => void;
  onOpenChange: (
    open: boolean
  ) => void;
}

export default function ReturnConfirmationDialog({
  open,
  loading,
  borrower,
  tool,
  quantity,
  onConfirm,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Return Tool
          </DialogTitle>

          <DialogDescription>
            This action will mark the loan
            as returned and restore the tool
            quantity to inventory.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-4 rounded-lg border bg-slate-50 p-4">

          <div className="flex justify-between">
            <span className="text-slate-500">
              Borrower
            </span>

            <span className="font-medium">
              {borrower}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Tool
            </span>

            <span className="font-medium">
              {tool}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Quantity
            </span>

            <span className="font-medium">
              {quantity}
            </span>
          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            disabled={loading}
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            onClick={onConfirm}
          >
            {loading
              ? "Returning..."
              : "Confirm Return"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
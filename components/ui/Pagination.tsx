"use client";

import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (
    page: number
  ) => void;
}

export default function Pagination({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
}: Props) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Button
        variant="outline"
        disabled={!hasPrev}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        Previous
      </Button>

      <span className="text-sm text-grey-700">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={!hasNext}
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Next
      </Button>
    </div>
  );
}
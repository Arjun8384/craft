"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  status: string;
  onSearchChange: (
    value: string
  ) => void;
  onStatusChange: (
    value: string
  ) => void;
}

export default function LoanFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm md:flex-row">

      <div className="relative flex-1">

        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

        <Input
          className="pl-10"
          placeholder="Search borrower or tool..."
          value={search}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
        />

      </div>

      <select
        className="rounded-md border px-3 py-2"
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target.value
          )
        }
      >
        <option value="all">
          All Status
        </option>

        <option value="Borrowed">
          Borrowed
        </option>

        <option value="Returned">
          Returned
        </option>

        <option value="Overdue">
          Overdue
        </option>
      </select>

    </div>
  );
}
"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export default function LoanSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-grey-700" />

      <Input
        value={value}
        aria-label="Search borrower"
        placeholder="Search borrower..."
        className="pl-9"
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}
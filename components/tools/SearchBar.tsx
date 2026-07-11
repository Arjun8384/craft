"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {

  return (
    <div className="relative max-w-md">

      <Search
        className="absolute left-3 top-3 h-4 w-4 text-gray-400"
      />

      <Input
        value={value}
        placeholder="Search tools..."
        className="pl-9"
        onChange={(e)=>
          onChange(e.target.value)
        }
      />

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({
  onSearch,
}: SearchBarProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(search.trim());
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, onSearch]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-3 h-4 w-4 text-grey-700" />

      <Input
        aria-label="Search tools"
        placeholder="Search tools..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="pl-10"
      />
    </div>
  );
}
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  categories: string[];

  category: string;
  status: string;
  condition: string;

  onCategoryChange: (value: string | null) => void;
  onStatusChange: (value: string | null) => void;
  onConditionChange: (value: string | null) => void;
}

export default function Filters({
  categories,
  category,
  // status,
  // condition,
  onCategoryChange,
  // onStatusChange,
  // onConditionChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Category */}

          <Select
          value={category}
          onValueChange={(value) => {
            onCategoryChange(value);
          }}
        >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Categories
          </SelectItem>

          {categories.map((item) => (
            <SelectItem
              key={item}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}

          <Select
            value={category}
            onValueChange={(value) => {
              onCategoryChange(value);
            }}
          >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Status
          </SelectItem>

          <SelectItem value="Available">
            Available
          </SelectItem>

          <SelectItem value="Borrowed">
            Borrowed
          </SelectItem>

          <SelectItem value="Maintenance">
            Maintenance
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Condition */}

          <Select
            value={category}
            onValueChange={(value) => {
              onCategoryChange(value);
            }}
          >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Condition" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Conditions
          </SelectItem>

          <SelectItem value="Excellent">
            Excellent
          </SelectItem>

          <SelectItem value="Good">
            Good
          </SelectItem>

          <SelectItem value="Fair">
            Fair
          </SelectItem>

          <SelectItem value="Damaged">
            Damaged
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
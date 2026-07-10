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

  onCategoryChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  onConditionChange: (
    value: string
  ) => void;
}

export default function Filters({
  categories,
  category,
  onCategoryChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Select
        value={category}
        onValueChange={(value) => {
          if (value) {
            onCategoryChange(value);
          }
        }}
      >
        <SelectTrigger
          className="w-[180px]"
          aria-label="Filter by category"
        >
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

      <Select
        value={category}
        onValueChange={(value) => {
          if (value) {
            onCategoryChange(value);
          }
        }}
      >
        <SelectTrigger
          className="w-[180px]"
          aria-label="Filter by status"
        >
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

      <Select
        value={category}
        onValueChange={(value) => {
          if (value) {
            onCategoryChange(value);
          }
        }}
      >
        <SelectTrigger
          className="w-[180px]"
          aria-label="Filter by condition"
        >
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
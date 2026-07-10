"use client";

interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export default function LoanFilters({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-md border p-2"
      aria-label="Loan Status Filter"
    >
      <option value="all">
        All
      </option>

      <option value="Borrowed">
        Borrowed
      </option>

      <option value="Returned">
        Returned
      </option>
    </select>
  );
}
import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">
      <PackageOpen className="mb-4 h-12 w-12 text-grey-700" />

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-grey-700">
        {description}
      </p>
    </div>
  );
}
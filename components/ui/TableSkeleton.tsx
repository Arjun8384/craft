import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
}

export default function TableSkeleton({
  rows = 5,
}: TableSkeletonProps) {
  return (
    <div className="rounded-lg border">
      <div className="border-b p-4">
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="divide-y">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-4 p-4"
          >
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
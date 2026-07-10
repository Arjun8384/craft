import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="mb-2 h-10 w-64" />

        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border p-6"
          >
            <Skeleton className="mb-6 h-5 w-24" />

            <Skeleton className="h-10 w-20" />
          </div>
        ))}
      </div>

      <Skeleton className="h-80 w-full rounded-lg" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-lg" />

        <Skeleton className="h-72 rounded-lg" />
      </div>
    </div>
  );
}
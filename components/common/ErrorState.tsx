"use client";

import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "Unable to load data.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-lg border border-destructive/30 p-8 text-center">
      <TriangleAlert className="mb-4 h-14 w-14 text-destructive" />

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-grey-700">
        {description}
      </p>

      {onRetry && (
        <Button
          className="mt-6"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
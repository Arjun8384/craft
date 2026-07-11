"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-6 px-6 text-center">
      <h1 className="text-4xl font-bold">
        Something went wrong
      </h1>

      <p className="max-w-lg text-grey-700">
        An unexpected error occurred while loading this page.
      </p>

      <Button
        onClick={reset}
        aria-label="Retry loading page"
      >
        Try Again
      </Button>
    </div>
  );
}
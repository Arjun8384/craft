import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-6 px-6 text-center">
      <h1 className="text-7xl font-bold">
        404
      </h1>

      <h2 className="text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="max-w-md text-grey-700">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <Link href="/dashboard">
        <Button>
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
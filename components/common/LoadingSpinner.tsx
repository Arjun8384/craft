import { LoaderCircle } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <LoaderCircle className="h-10 w-10 animate-spin" />

      <p className="text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
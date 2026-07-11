"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Tool Inventory
          </h1>

          <p className="text-muted-foreground">
            Manage tools in the library.
          </p>
        </div>

        <Link href="/dashboard/tools/new">
          <Button>
            Add Tool
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-card p-8">
        <p className="text-muted-foreground">
          Tool inventory is temporarily disabled while preparing the production build.
        </p>
      </div>
    </div>
  );
}
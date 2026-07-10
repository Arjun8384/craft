"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { useTools } from "@/hooks/useTools";
import { deleteTool } from "@/services/toolService";

import ToolTable from "@/components/tools/ToolTable";
import SearchBar from "@/components/tools/SearchBar";
import Filters from "@/components/tools/Filters";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";

export default function ToolsPage() {
const {
  tools,
  loading,
  refresh,

  categories,

  category,
  status,
  condition,

  setSearch,
  setCategory,
  setStatus,
  setCondition,
} = useTools();

  const [deleting, setDeleting] = useState(false);

  async function handleDelete(id: string) {
  try {
    setDeleting(true);

    await deleteTool(id);

    console.log(
      "[Analytics] User interacted with Feature Complete CRUD"
    );

    toast.success("Tool deleted successfully.");

    refresh();
  } catch {
    toast.error("Failed to delete tool.");
  } finally {
    setDeleting(false);
  }
}

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Tool Inventory
          </h1>

          <p className="text-muted-foreground">
            Manage all available tools.
          </p>
        </div>

        <Button>
          <Link href="/dashboard/tools/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Tool
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <SearchBar onSearch={setSearch} />

        <Filters
          categories={categories}
          category={category}
          status={status}
          condition={condition}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
          onConditionChange={setCondition}
        />
      </div>

      {loading || deleting ? (
        <LoadingSpinner message="Loading tools..." />      ) : (
        <ToolTable
          tools={tools}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}
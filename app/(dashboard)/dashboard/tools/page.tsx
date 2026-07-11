"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import type { ITool } from "@/types/tool"
import { useAuth } from "@/hooks/useAuth";

import {
  deleteTool,
  getTools,
} from "@/services/toolService";

import SearchBar from "@/components/tools/SearchBar";
import ToolTable from "@/components/tools/ToolTable";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function ToolsPage() {
  const { role } = useAuth();

  const [tools, setTools] = useState<ITool[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] =
    useState("");

  async function loadTools() {
    try {
      setLoading(true);

      const data = await getTools();

      setTools(data);
    } catch {
      toast.error("Failed to load tools.");
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  const initialize = async () => {
    const data = await getTools();
    setTools(data);
  };

  void initialize();
}, []);

  async function handleDelete(id: string) {
    await deleteTool(id);

    toast.success("Tool deleted.");

    loadTools();
  }

  const filteredTools = useMemo(() => {
    return tools.filter((tool) =>
      tool.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [tools, search]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Tool Inventory
          </h1>

          <p className="text-gray-500">
            Manage available tools.
          </p>
        </div>

        {role === "admin" && (
          <Link href="/dashboard/tools/new">
            <Button>Add Tool</Button>
          </Link>
        )}
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ToolTable
          tools={filteredTools}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
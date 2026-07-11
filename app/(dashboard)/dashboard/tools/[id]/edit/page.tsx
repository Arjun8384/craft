"use client";

import { use, useEffect, useState } from "react";
import { toast } from "sonner";

import { ITool } from "@/models/Tool";
import { getTool } from "@/services/toolService";

import ToolForm from "@/components/tools/ToolForm";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorState from "@/components/common/ErrorState";

interface EditToolPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditToolPage({
  params,
}: EditToolPageProps) {
  const { id } = use(params);

  const [tool, setTool] = useState<ITool | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTool() {
      try {
        const response = await getTool(id);

        setTool(response.data);
      } catch {
        toast.error("Unable to load tool.");
      } finally {
        setLoading(false);
      }
    }

    fetchTool();
  }, [id]);

  if (loading) {
    return (
        <LoadingSpinner message="Loading tools..." />    );
  }

  if (!tool) {
    return (
      <ErrorState
    title="Tool Not Found"
    description="The requested tool does not exist."
/>
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Tool
        </h1>

        <p className="text-grey-700">
          Update tool information.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 shadow-sm bg-white p-6">
        <ToolForm
          mode="edit"
          initialData={tool}
        />
      </div>
    </section>
  );
}
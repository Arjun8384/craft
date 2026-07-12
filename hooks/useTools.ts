"use client";

import { useEffect, useState } from "react";

import { getTools } from "@/services/toolService";

import { ITool } from "@/types/tool";

export function useTools() {
  const [tools, setTools] =
    useState<ITool[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadTools() {
    try {
      setLoading(true);

      const data =
        await getTools();

      setTools(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadTools();
  }, []);

  return {
    tools,
    loading,
    refresh: loadTools,
  };
}
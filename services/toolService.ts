import type { ToolInput } from "@/lib/validators";

const BASE_URL = "/api/tools";

export type ToolPayload = ToolInput;

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export async function getTools() {
  const response = await fetch(
    "/api/tools",
    {
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ??
      "Failed to fetch tools."
    );
  }

  return result.data;
}

export async function getTool(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function createTool(
  tool: ToolPayload
) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tool),
  });

  return handleResponse(response);
}

export async function updateTool(
  id: string,
  tool: ToolPayload
) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tool),
  });

  return handleResponse(response);
}

export async function deleteTool(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

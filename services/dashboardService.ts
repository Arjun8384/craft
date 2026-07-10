import { DashboardStats } from "@/types/dashboard";

async function handleResponse(
  response: Response
): Promise<DashboardStats> {
  const result =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ??
        "Failed to load dashboard."
    );
  }

  return result.data;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response =
    await fetch(
      "/api/dashboard/stats",
      {
        credentials: "include",
      }
    );

  return handleResponse(
    response
  );
}
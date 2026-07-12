import { ILoan, LoanPayload } from "@/types/loan";

const BASE_URL = "/api/loans";

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}

export interface LoanFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
}

export interface LoanPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface LoanResponse {
  success: boolean;
  data: ILoan[];
  pagination: LoanPagination;
}

export async function getLoans(): Promise<LoanResponse> {
  const response = await fetch(BASE_URL, {
    credentials: "include",
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function returnLoan(id: string) {
  console.log("Returning", id);

  const response = await fetch(
    `/api/loans/${id}/return`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  return handleResponse(response);
}


export async function getLoan(id: string) {
  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  return handleResponse(response);
}

export async function createLoan(
  loan: LoanPayload
) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loan),
  });

  return handleResponse(response);
}

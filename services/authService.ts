import { IUser } from "@/types/user";
import {
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}

export async function login(
  payload: LoginPayload
) {
  const response = await fetch(
    "/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
}

export async function register(
  payload: RegisterPayload
) {
  const response = await fetch(
    "/api/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
}

export async function logout() {
  const response = await fetch(
    "/api/auth/logout",
    {
      method: "POST",
      credentials: "include",
    }
  );

  return handleResponse(response);
}

export async function getMe(): Promise<IUser | null> {
  const response = await fetch(
    "/api/auth/me",
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user as IUser;
}
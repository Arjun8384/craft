import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (
    user.role !== "admin" 
    // && user.role !== "manager"
  ) {
    throw new Error("Forbidden");
  }

  return user;
}

export function generateToken(payload: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(
  token: string
) {
  return jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload;
}
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import { getDashboardStats } from "@/lib/dashboard";

export async function GET() {
  try {
    await requireAuth();

    await connectDB();

    const stats = await getDashboardStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load dashboard statistics.",
      },
      {
        status: 500,
      }
    );
  }
}
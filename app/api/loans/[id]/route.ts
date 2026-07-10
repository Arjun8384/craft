import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";

import Loan from "@/models/Loan";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: Context
) {
  try {
    await requireAuth();

    await connectDB();

    const { id } = await params;

    const loan =
      await Loan.findById(id)
        .populate("toolId");

    if (!loan) {
      return NextResponse.json(
        {
          success: false,
          message: "Loan not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: loan,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch loan.",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

import Loan from "@/models/Loan";
import Tool from "@/models/Tool";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: Request,
  { params }: Context
) {
  try {
    await requireAdmin();

    console.log("RETURN ROUTE HIT");

    await connectDB();

    const { id } = await params;

    const loan = await Loan.findById(id);

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

    if (loan.status === "Returned") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Tool already returned.",
        },
        {
          status: 400,
        }
      );
    }

    const tool = await Tool.findById(
      loan.toolId
    );

    if (!tool) {
      return NextResponse.json(
        {
          success: false,
          message: "Tool not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Update Tool

    tool.availableQuantity +=
      loan.quantity;

    tool.status =
      tool.availableQuantity > 0
        ? "Available"
        : "Borrowed";

    // Update Loan

    loan.status = "Returned";

    loan.actualReturnDate =
      new Date();

    loan.returnedAt =
      new Date();

    // Save Both

    await tool.save();

    await loan.save();

    console.log("RETURN COMPLETED");

    return NextResponse.json({
      success: true,
      message:
        "Tool returned successfully.",
      data: loan,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to return tool.",
      },
      {
        status: 500,
      }
    );
  }
}
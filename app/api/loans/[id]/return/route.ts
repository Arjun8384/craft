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

    await connectDB();

    const { id } = await params;

    const loan =
      await Loan.findById(id);

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

    if (
      loan.status === "Returned"
    ) {
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

    const tool =
      await Tool.findById(
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

    tool.availableQuantity +=
      loan.quantity;

    if (
      tool.availableQuantity > 0
    ) {
      tool.status =
        "Available";
    }

    await tool.save();

    loan.status = "Returned";

loan.actualReturnDate = new Date();

await loan.save();

    return NextResponse.json({
      success: true,
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
import { NextRequest, NextResponse } from "next/server";

import Tool from "@/models/Tool";
import Loan from "@/models/Loan";
import { connectDB } from "@/lib/mongodb";
import { toolSchema } from "@/lib/validators";
import { sanitizeInput } from "@/lib/sanitize";
import { logAnalytics } from "@/lib/analytics";
import {
  requireAuth,
  requireAdmin,
} from "@/lib/auth";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    await requireAuth();
    await connectDB();

    const { id } = await params;

const tool = await Tool.findById(id).lean();

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

const currentBorrowers =
  await Loan.find({
    toolId: id,
    status: "Borrowed",
  })
    .select(
      "_id borrowerName borrowerEmail quantity borrowDate expectedReturnDate status"
    )
    .sort({
      expectedReturnDate: 1,
    })
    .lean();

const borrowHistory =
  await Loan.find({
    toolId: id,
  })
    .select(
      "_id borrowerName borrowerEmail quantity borrowDate expectedReturnDate status"
    )
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .lean();

    return NextResponse.json({
      success: true,
      data: {
      ...tool,
      borrowedQuantity:
        tool.quantity -
        tool.availableQuantity,

      currentBorrowers,

      borrowHistory,
    },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Unauthorized"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tool.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const parsed = toolSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors:
            parsed.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const data = parsed.data;

    const updatedTool =
      await Tool.findByIdAndUpdate(
        id,
        {
          ...data,
          name: sanitizeInput(data.name),
          category: sanitizeInput(
            data.category
          ),
          description: sanitizeInput(
            data.description
          ),
          location: sanitizeInput(
            data.location
          ),
          image: data.image
            ? sanitizeInput(data.image)
            : "",
        },
        {
          new: true,
        }
      );

    if (!updatedTool) {
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

    logAnalytics("Tool Updated");

    return NextResponse.json({
      success: true,
      data: updatedTool,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          {
            status: 401,
          }
        );
      }

      if (error.message === "Forbidden") {
        return NextResponse.json(
          {
            success: false,
            message: "Forbidden",
          },
          {
            status: 403,
          }
        );
      }
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update tool.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    await connectDB();

    const { id } = await params;

    const tool =
      await Tool.findByIdAndDelete(id);

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

    logAnalytics("Tool Deleted");

    return NextResponse.json({
      success: true,
      message: "Tool deleted successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          {
            status: 401,
          }
        );
      }

      if (error.message === "Forbidden") {
        return NextResponse.json(
          {
            success: false,
            message: "Forbidden",
          },
          {
            status: 403,
          }
        );
      }
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete tool.",
      },
      {
        status: 500,
      }
    );
  }
}
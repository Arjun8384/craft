import { NextRequest, NextResponse } from "next/server";
import type { SortOrder } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { loanSchema } from "@/lib/loanValidators";
import { sanitizeInput } from "@/lib/sanitize";
import {
  // requireAdmin,
  requireAuth,
} from "@/lib/auth";

import Loan from "@/models/Loan";
import Tool from "@/models/Tool";

export async function GET(
  req: NextRequest
) {
  try {
    const user = await requireAuth();

    await connectDB();

    const searchParams =
      req.nextUrl.searchParams;

    const search =
      searchParams.get("search") ?? "";

    const status =
      searchParams.get("status") ?? "all";

    const page = Number(
      searchParams.get("page") ?? "1"
    );

    const limit = Number(
      searchParams.get("limit") ?? "10"
    );

    const sort =
      searchParams.get("sort") ??
      "newest";

    const query: Record<
      string,
      unknown
    > = {};

    if (search.trim()) {
      query.$or = [
        {
          borrowerName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          borrowerEmail: {
            $regex: search,
            $options: "i",
          },
        },
        {
          borrowerPhone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status !== "all"){
      query.status = status;
    }
    if (user.role !== "admin") {
      query.borrowerEmail = user.email;
    }

    const sortQuery: {createdAt: SortOrder; } = {
        createdAt: 
        sort === "oldest" ? 1 : -1,
    };
    const loans =
      await Loan.find(query)
        .populate("toolId")
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit);

    const total =
      await Loan.countDocuments(
        query
      );

    return NextResponse.json({
      success: true,

      data: loans,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(
          total / limit
        ),
        hasNext:
          page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: NextRequest
) {
  try {
    // await requireAdmin();

    await connectDB();

    const body = await req.json();

    const parsed =
      loanSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors:
            parsed.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const data = parsed.data;

    const tool =
      await Tool.findById(data.toolId);

    if (!tool) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Tool not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      tool.availableQuantity <
      data.quantity
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Not enough tools available.",
        },
        {
          status: 400,
        }
      );
    }

    tool.availableQuantity -=
      data.quantity;

    if (
      tool.availableQuantity === 0
    ) {
      tool.status = "Borrowed";
    }

    await tool.save();

    const loan =
      await Loan.create({
        toolId: data.toolId,

        borrowerName:
          sanitizeInput(
            data.borrowerName
          ),

        borrowerEmail:
          sanitizeInput(
            data.borrowerEmail
          ),

        borrowerPhone:
          sanitizeInput(
            data.borrowerPhone
          ),

        quantity: data.quantity,

        expectedReturnDate:
          data.expectedReturnDate,
      });

    console.log(
      "[Analytics] User interacted with Feature Complete CRUD"
    );

    return NextResponse.json(
      {
        success: true,
        data: loan,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";

import Tool from "@/models/Tool";
import { connectDB } from "@/lib/mongodb";
import { toolSchema } from "@/lib/validators";
import { sanitizeInput } from "@/lib/sanitize";
import { logAnalytics } from "@/lib/analytics";
import { requireAuth, requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const condition = searchParams.get("condition");

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
        {
          status: {
            $regex: search,
            $options: "i",
          },
        },
        {
          condition: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (condition && condition !== "all") {
      query.condition = condition;
    }

    const tools = await Tool.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: tools,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tools.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    await connectDB();

    const body = await req.json();

    const parsed = toolSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const data = parsed.data;

    const tool = await Tool.create({
      ...data,

      name: sanitizeInput(data.name),

      category: sanitizeInput(data.category),

      description: sanitizeInput(
        data.description
      ),

      location: sanitizeInput(data.location),

      image: data.image
        ? sanitizeInput(data.image)
        : "",
    });

    logAnalytics("Tool Created");

    return NextResponse.json(
      {
        success: true,
        data: tool,
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
        message: "Failed to create tool.",
      },
      {
        status: 500,
      }
    );
  }
}
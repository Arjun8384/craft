import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";

import { connectDB } from "@/lib/mongodb";
import { registerSchema } from "@/lib/authValidators";
import { hashPassword } from "@/lib/password";
import { sanitizeInput } from "@/lib/sanitize";

export async function POST(
  req: NextRequest
) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors:
            validation.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const {
      name,
      email,
      password,
    } = validation.data;

    const existing =
      await User.findOne({
        email,
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword =
      await hashPassword(password);

    const user =
      await User.create({
        name: sanitizeInput(name),

        email: sanitizeInput(email),

        password: hashedPassword,

        role: "user",
      });

    console.log(
      "[Analytics] User interacted with Authentication"
    );

    return NextResponse.json(
      {
        success: true,

        message:
          "Registration successful.",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
  console.error(
    "REGISTER ERROR:",
    error
  );

  return NextResponse.json(
    {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error",
    },
    {
      status: 500,
    }
  );
}}
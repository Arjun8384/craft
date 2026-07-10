import { NextResponse } from "next/server";

export async function POST() {
  console.log(
    "[Analytics] User interacted with Authentication"
  );

  const response = NextResponse.json({
    success: true,
    message: "Logout successful",
  });

  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
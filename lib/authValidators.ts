import { z } from "zod";

export const registerSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(2, "Name is required.")
      .max(50),

    email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email."),

    password: z
      .string()
      .min(
        6,
        "Password must be at least 6 characters."
      )
      .max(100),
  });

export const loginSchema =
  z.object({
    email: z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email."),

    password: z
  .string()
  .min(6, "Password must be at least 6 characters"),
  });
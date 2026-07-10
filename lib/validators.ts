import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const toolSchema = z.object({
  name: z.string().trim().min(2),

  category: z.string().trim().min(2),

  description: z.string().trim().min(10),

  quantity: z.coerce.number().min(0),

  availableQuantity: z.coerce.number().min(0),

  condition: z.enum([
    "Excellent",
    "Good",
    "Fair",
    "Damaged",
  ]),

  location: z.string().trim().min(2),

  status: z.enum([
    "Available",
    "Borrowed",
    "Maintenance",
  ]),

  image: z.string().optional(),
});

export type ToolInput = z.infer<typeof toolSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
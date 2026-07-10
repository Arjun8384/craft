import { z } from "zod";

export const loanSchema = z.object({
  toolId: z.string().min(1),

  borrowerName: z
    .string()
    .min(2)
    .max(100),

  borrowerEmail: z
    .string()
    .email(),

  borrowerPhone: z
    .string()
    .min(8)
    .max(20),

  quantity: z.coerce
    .number()
    .min(1),

  expectedReturnDate:
    z.string().min(1),
});
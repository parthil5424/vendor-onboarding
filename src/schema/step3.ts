import { z } from "zod";

export const step3Schema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service"),

  pricingModel: z
    .string()
    .refine(
      (val) => ["Subscription", "One-time", "Pay-per-use"].includes(val),
      {
        message: "Invalid pricing model",
      }
    ),

  currency: z.string().min(1, "Currency is required"),

  declaration: z.boolean().refine((val) => val === true, {
    message: "You must accept the declaration",
  }),

  notes: z.string().optional(),

  finalDoc: z.any().optional(),
});

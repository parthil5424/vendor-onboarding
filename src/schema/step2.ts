import { z } from "zod";

export const step2Schema = z.object({
  address: z.string().min(1, "Address is required"),

  country: z.string().min(1, "Country is required"),

  state: z.string().optional(),

  zipCode: z.number("ZIP Code must be a number").min(1, "ZIP Code is required"),

  bankName: z.string().min(1, "Bank name is required"),

  accountNumber: z
    .string()
    .min(9, "Account number must be at least 9 digits")
    .max(18, "Account number must be at most 18 digits")
    .regex(/^[0-9]+$/, "Account number must contain only digits"),

  ifsc: z.string().optional(),

  bankProof: z.any().optional(),
});

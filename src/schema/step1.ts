import { z } from "zod";

export const step1Schema = z.object({
  companyName: z.string().min(1, "Company name is required"),

  companyType: z.string().optional(),

  registrationNumber: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[A-Za-z0-9-]{5,30}$/.test(val), {
      message: "Invalid registration number",
    }),

  establishedDate: z.string().optional(),

  employeeCount: z
    .number()
    .optional()
    .refine((val) => val === undefined || val >= 0, {
      message: "Employee count must be positive",
    }),

  contactName: z.string().min(1, "Contact name is required"),

  contactEmail: z.email("Invalid email format"),

  contactPhone: z.string().min(6, "Phone must be at least 6 digits"),

  companyLogo: z.any().optional(),
});

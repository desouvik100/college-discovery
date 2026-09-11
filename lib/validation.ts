import { z } from "zod";

export const collegeQuerySchema = z.object({
  search: z.string().optional(),
  state: z.string().optional(),
  minFees: z.coerce.number().int().min(0).optional(),
  maxFees: z.coerce.number().int().min(0).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  collegeType: z.enum(["GOVERNMENT", "PRIVATE", "DEEMED"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  sortBy: z.enum(["rating", "fees", "name"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const collegeCompareSchema = z.object({
  ids: z.string().transform((val) => val.split(',')).pipe(
    z.array(z.string().uuid()).min(2).max(3)
  ),
});

export const predictRequestSchema = z.object({
  examCode: z.string().min(1, "Exam code is required"),
  rank: z.number().int().min(1, "Rank must be a positive number"),
  category: z.enum(["GENERAL", "OBC", "SC", "ST", "EWS"]).default("GENERAL"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const saveCollegeSchema = z.object({
  collegeId: z.string().uuid("Invalid college identifier"),
});

export const saveComparisonSchema = z.object({
  collegeIds: z
    .array(z.string().uuid("Invalid college identifier"))
    .min(2, "Select at least 2 institutions to compare")
    .max(3, "You can compare at most 3 institutions")
    .refine((ids) => new Set(ids).size === ids.length, {
      message: "Duplicate institutions are not allowed in a comparison",
    }),
  title: z.string().trim().max(120).optional(),
});

export type CollegeQuery = z.infer<typeof collegeQuerySchema>;
export type CollegeCompareQuery = z.infer<typeof collegeCompareSchema>;
export type PredictRequest = z.infer<typeof predictRequestSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SaveCollegeInput = z.infer<typeof saveCollegeSchema>;
export type SaveComparisonInput = z.infer<typeof saveComparisonSchema>;

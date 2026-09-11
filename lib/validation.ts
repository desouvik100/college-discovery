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

export type CollegeQuery = z.infer<typeof collegeQuerySchema>;
export type CollegeCompareQuery = z.infer<typeof collegeCompareSchema>;
export type PredictRequest = z.infer<typeof predictRequestSchema>;

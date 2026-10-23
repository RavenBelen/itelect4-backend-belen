import { z } from "zod";

export const aiRequestSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe your aquarium in at least 20 characters.")
    .max(2000, "Keep the description under 2000 characters."),
});

export const reviewSchema = z.object({
  summary: z
    .string()
    .describe("A short assessment of the aquarium notes."),
  strengths: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("Positive care details from the notes."),
  improvements: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("Practical care details to improve or check."),
  status: z
    .enum(["healthy", "monitor", "needs-attention"])
    .describe("Overall aquarium status."),
});

export type Review = z.infer<typeof reviewSchema>;

export const reviewJsonSchema = z.toJSONSchema(reviewSchema);
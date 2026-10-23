import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../middleware/auth";
import { aiRequestSchema } from "../schemas/review";
import { AiReplyError, reviewProject } from "../ai/gemini";

const router = Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10,
  keyGenerator: (req) => req.userId ?? req.ip ?? "unknown",
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "AI review limit reached. Try again later." },
});

router.post("/", requireAuth, aiLimiter, async (req, res) => {
  const parsed = aiRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Enter aquarium notes between 20 and 2000 characters.",
    });
    return;
  }

  try {
    const review = await reviewProject(parsed.data.prompt);
    res.status(200).json(review);
  } catch (error) {
    if (error instanceof AiReplyError) {
      res.status(502).json({ message: "The AI returned an invalid review. Try again." });
      return;
    }

    const message = error instanceof Error ? error.message : "";
    if (/quota|rate.?limit|resource.?exhausted/i.test(message)) {
      res.status(429).json({ message: "The AI service is busy. Try again later." });
      return;
    }

    console.error("AI review failed:", error);
    res.status(500).json({ message: "Could not create an aquarium review." });
  }
});

export default router;
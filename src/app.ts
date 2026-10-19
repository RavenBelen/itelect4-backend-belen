import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import bettaRoutes from "./routes/bettas";
import plantRoutes from "./routes/plants";
import tankRoutes from "./routes/tanks";
import { connectDatabase } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests from Postman and other tools may not include an Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS"));
    },
  }),
);

app.use(express.json());

app.use(async (_req, _res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, db: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/bettas", bettaRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/tanks", tankRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
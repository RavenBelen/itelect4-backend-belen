import "dotenv/config";
import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

vi.mock("../src/config/database", () => ({
  connectDatabase: () => Promise.resolve(),
}));

import app from "../src/app";

function tokenForUser(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Set JWT_SECRET in the backend .env file before testing.");
  }

  return jwt.sign(
    { userId: "507f1f77bcf86cd799439011" },
    secret
  );
}

describe("POST /api/ai authentication and validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when no token is sent", async () => {
    const response = await request(app)
      .post("/api/ai")
      .send({ prompt: "These aquarium notes are long enough to pass validation." });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No token provided");
  });

  it("returns 401 when the token is invalid", async () => {
    const response = await request(app)
      .post("/api/ai")
      .set("Authorization", "Bearer not-a-valid-token")
      .send({ prompt: "These aquarium notes are long enough to pass validation." });

    expect(response.status).toBe(401);
  });

  it("lets a valid token reach prompt validation", async () => {
    const response = await request(app)
      .post("/api/ai")
      .set("Authorization", `Bearer ${tokenForUser()}`)
      .send({ prompt: "Too short" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Enter aquarium notes between 20 and 2000 characters."
    );
  });
});
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    name.trim().length === 0 ||
    password.length < 8
  ) {
    res.status(400).json({
      message: "Name, valid email, and a password of at least 8 characters are required",
    });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: passwordHash,
    });

    res.status(201).json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch {
    res.status(500).json({ message: "Could not register user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Email or password is incorrect" });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      secret,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      token,
    });
  } catch {
    res.status(500).json({ message: "Could not log in" });
  }
});

export default router;
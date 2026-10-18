/// <reference path="../types/express.d.ts" />

import { Router } from "express";
import { Types } from "mongoose";
import { TankModel } from "../models/Tank";
import { requireAuth } from "../middleware/auth";
import type { NewTankBody } from "../types";

const router = Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const tanks = await TankModel.find({
    studentId: new Types.ObjectId(req.userId!),
  }).sort({ size: 1 });

  res.json(tanks);
});

router.post("/", async (req, res) => {
  const body = req.body as NewTankBody;

  const tank = await TankModel.create({
    size: body.size,
    waterType: body.waterType,
    temperature: body.temperature,
    hasFilter: body.hasFilter,
    status: body.status,
    image: body.image,
    description: body.description,
    studentId: new Types.ObjectId(req.userId!),
  });

  res.status(201).json(tank);
});

router.delete("/:id", async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: "Tank not found" });
    return;
  }

  const tank = await TankModel.findOneAndDelete({
    _id: req.params.id,
    studentId: new Types.ObjectId(req.userId!),
  });

  if (!tank) {
    res.status(404).json({ message: "Tank not found" });
    return;
  }

  res.status(204).send();
});

export default router;
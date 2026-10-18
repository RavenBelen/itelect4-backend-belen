/// <reference path="../types/express.d.ts" />

import { Router } from "express";
import { Types } from "mongoose";
import { PlantModel } from "../models/Plant";
import { requireAuth } from "../middleware/auth";
import type { NewPlantBody } from "../types";

const router = Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const plants = await PlantModel.find({
    studentId: new Types.ObjectId(req.userId!),
  }).sort({ name: 1 });

  res.json(plants);
});

router.post("/", async (req, res) => {
  const body = req.body as NewPlantBody;

  const plant = await PlantModel.create({
    name: body.name,
    type: body.type,
    quantity: body.quantity,
    status: body.status,
    image: body.image,
    description: body.description,
    studentId: new Types.ObjectId(req.userId!),
  });

  res.status(201).json(plant);
});

router.delete("/:id", async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: "Plant not found" });
    return;
  }

  const plant = await PlantModel.findOneAndDelete({
    _id: req.params.id,
    studentId: new Types.ObjectId(req.userId!),
  });

  if (!plant) {
    res.status(404).json({ message: "Plant not found" });
    return;
  }

  res.status(204).send();
});

export default router;
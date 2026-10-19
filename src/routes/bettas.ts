/// <reference path="../types/express.d.ts" />
import { Router } from "express";
import { Types } from "mongoose";
import { BettaModel } from "../models/Betta";
import { requireAuth } from "../middleware/auth";
import type { NewBettaBody } from "../types";

const router = Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const bettas = await BettaModel.find({
    studentId: new Types.ObjectId(req.userId!),
  }).sort({ name: 1 });

  res.json(bettas);
});

router.get("/:id", async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: "Betta not found" });
    return;
  }

  const betta = await BettaModel.findOne({
    _id: req.params.id,
    studentId: new Types.ObjectId(req.userId!),
  });

  if (!betta) {
    res.status(404).json({ message: "Betta not found" });
    return;
  }

  res.json(betta);
});

router.post("/", async (req, res) => {
  const body = req.body as NewBettaBody;

  const betta = await BettaModel.create({
    name: body.name,
    strain: body.strain,
    gender: body.gender,
    age: body.age,
    price: body.price,
    image: body.image,
    description: body.description,
    studentId: new Types.ObjectId(req.userId!),
  });

  res.status(201).json(betta);
});

router.patch("/:id", async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: "Betta not found" });
    return;
  }

  const body = req.body as Partial<NewBettaBody>;
  const updates: Partial<NewBettaBody> = {};

  if (body.name !== undefined) updates.name = body.name;
  if (body.strain !== undefined) updates.strain = body.strain;
  if (body.gender !== undefined) updates.gender = body.gender;
  if (body.age !== undefined) updates.age = body.age;
  if (body.price !== undefined) updates.price = body.price;
  if (body.image !== undefined) updates.image = body.image;
  if (body.description !== undefined) updates.description = body.description;

  const betta = await BettaModel.findOneAndUpdate(
    {
      _id: req.params.id,
      studentId: new Types.ObjectId(req.userId!),
    },
    updates,
    { new: true, runValidators: true },
  );

  if (!betta) {
    res.status(404).json({ message: "Betta not found" });
    return;
  }

  res.json(betta);
});

router.delete("/:id", async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: "Betta not found" });
    return;
  }

  const betta = await BettaModel.findOneAndDelete({
    _id: req.params.id,
    studentId: new Types.ObjectId(req.userId!),
  });

  if (!betta) {
    res.status(404).json({ message: "Betta not found" });
    return;
  }

  res.status(204).send();
});

export default router;
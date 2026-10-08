import { model, Schema } from "mongoose";
import type { BettaDoc } from "../types/index";

const bettaSchema = new Schema<BettaDoc>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 40,
  },
  strain: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 60,
    validate: {
      validator: Number.isInteger,
      message: "Age must be a whole number.",
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  status: {
    type: String,
    default: "Healthy",
  },
  image: String,
  description: {
    type: String,
    trim: true,
  },
});

bettaSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const BettaModel = model<BettaDoc>("Betta", bettaSchema);
import { model, Schema } from "mongoose";
import type { TankDoc } from "../types/index";

const tankSchema = new Schema<TankDoc>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  size: { type: String, required: true, trim: true },
  waterType: { type: String, required: true, trim: true },
  temperature: { type: Number, required: true },
  hasFilter: { type: Boolean, required: true },
  status: { type: String, default: "Healthy" },
  image: String,
  description: { type: String, trim: true },
});

tankSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const TankModel = model<TankDoc>("Tank", tankSchema);
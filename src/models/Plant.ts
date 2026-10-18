import { model, Schema } from "mongoose";
import type { PlantDoc } from "../types/index";

const plantSchema = new Schema<PlantDoc>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  status: { type: String, default: "Healthy" },
  image: String,
  description: { type: String, trim: true },
});

plantSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const PlantModel = model<PlantDoc>("Plant", plantSchema);
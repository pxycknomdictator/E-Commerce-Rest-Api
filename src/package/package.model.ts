import { Schema, model, Document } from "mongoose";

export interface Package {
  _id?: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  size: "sm" | "md" | "lg";
  createdAt: Date;
  updateAt: Date;
}

const packageSchema = new Schema<Package & Document>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true, default: "/" },
    size: { type: String, enum: ["sm", "md", "lg"] },
  },
  { timestamps: true }
);

export const Package = model<Package>("Package", packageSchema);

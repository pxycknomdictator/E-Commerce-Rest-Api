import { Schema, model, Document } from "mongoose";

interface Order {
  _id: string;
  userId: Schema.Types.ObjectId;
  packageId: Schema.Types.ObjectId;
  status: "Pending" | "Cancelled" | "Delivered";
  createdAt: Date;
  updateAt: Date;
}

const orderSchema = new Schema<Order & Document>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    packageId: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    status: { type: String, enum: ["Pending", "Cancelled", "Delivered"] },
  },
  { timestamps: true }
);

export const Order = model<Order>("Order", orderSchema);

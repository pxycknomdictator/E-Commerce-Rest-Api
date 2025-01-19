import { Schema, model, Document } from "mongoose";
import { Package } from "../package/package.model.js";

interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "agent" | "admin";
  packages: Package[];
  createdAt: Date;
  updateAt: Date;
}

const userSchema = new Schema<User & Document>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, minlength: 6, maxlength: 20 },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "agent", "admin"], default: "user" },
    packages: [{ type: Schema.Types.ObjectId, ref: "Package" }],
  },
  { timestamps: true }
);

export const User = model<User>("User", userSchema);

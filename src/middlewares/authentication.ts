import jwt from "jsonwebtoken";
import { config } from "../config/configuration.js";

interface Payload {
  _id: string;
  username: string;
  email: string;
}

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, config.jwt_secret_key as string, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
};

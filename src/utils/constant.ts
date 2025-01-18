import * as argon2 from "argon2";
import { config } from "../config/configuration.js";

export const JSON_LIMIT = "20kb";

export const corsOptions = {
  origin: config.origin,
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};

export const argonOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  parallelism: 1,
  hashLength: 32,
};

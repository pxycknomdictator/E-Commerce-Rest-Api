import { config } from "../config/configuration.js";

export const JSON_LIMIT = "20kb";

export const corsOptions = {
  origin: config.origin,
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};

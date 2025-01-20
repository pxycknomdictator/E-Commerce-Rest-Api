import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import express, { Express, Request, Response, NextFunction } from "express";
import { corsOptions, JSON_LIMIT } from "./utils/constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json({ limit: JSON_LIMIT }));
app.use(express.urlencoded({ extended: false, limit: JSON_LIMIT }));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Import routers
import userRouter from "./user/user.route.js";
import packageRouter from "./package/package.route.js";
import orderRouter from "./order/order.route.js";

// Routes
app.use("/api/auth", userRouter);
app.use("/api/", packageRouter);
app.use("/api/", orderRouter);

export { app, Request, Response, NextFunction };

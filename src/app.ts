import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express, { Express, Request, Response, NextFunction } from "express";
import { corsOptions, JSON_LIMIT } from "./utils/constant.js";

const app: Express = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json({ limit: JSON_LIMIT }));
app.use(express.urlencoded({ extended: false, limit: JSON_LIMIT }));

export { app, Request, Response, NextFunction };

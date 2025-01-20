import jwt from "jsonwebtoken";
import { config } from "../config/configuration.js";
import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../utils/responseHandler.js";

interface UserPayload {
  _id: string;
  username: string;
  email: string;
}

export const generateToken = (payload: UserPayload): string => {
  return jwt.sign(payload, config.jwt_secret_key as string, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
};

interface RequestPayload extends Request {
  user?: UserPayload;
}

export const authenticationValidator = (
  req: RequestPayload,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization?.split(" ").at(1) || req.cookies.access_token;

  if (token === undefined || token === null) {
    new ResponseHandler(res, 400, "❌ Unauthorized User", "⚠️ not okay", null);
    return;
  }

  try {
    const isAuthorized = jwt.verify(
      token,
      config.jwt_secret_key
    ) as UserPayload;

    if (!isAuthorized) {
      new ResponseHandler(res, 400, "⏳ Token is Expired", "⚠️ not okay", null);
      return;
    }

    req.user = isAuthorized;
    next();
  } catch (error) {
    new ResponseHandler(res, 404, "🔴 Error", "⚠️ not okay");
  }
};

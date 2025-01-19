import { NextFunction, Request, Response } from "../app.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ status: "Register" });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ status: "Login" });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    return res.status(200).json({ status: "Logout" });
  }
);

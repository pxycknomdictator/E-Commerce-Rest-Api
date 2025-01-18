import { Request, Response, NextFunction } from "../app.js";

type Callback = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | void>;

export const asyncHandler =
  (fn: Callback) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

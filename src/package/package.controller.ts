import { NextFunction, Request, Response } from "../app.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllPackages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { limit, category } = req.query;
    return res.status(200).json({ msg: "Get all packages" });
  }
);

export const getSinglePackage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { category, price } = req.query;
    return res.status(200).json({ msg: "Get all packages" });
  }
);

export const createPackage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ msg: "New package Created" });
  }
);

export const updatePackage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return res
      .status(204)
      .json({ msg: `Package Id: ${id} Updated Successfully` });
  }
);

export const deletePackage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return res
      .status(205)
      .json({ msg: `Package Id: ${id} Deleted Successfully` });
  }
);

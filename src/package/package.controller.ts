import { NextFunction, Request, Response } from "../app.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ResponseHandler } from "../utils/responseHandler.js";
import { Package } from "./package.model.js";

export const getAllPackages = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const skip = parseInt(req.query.skip as string) || 0;
    const { limit, category } = req.query;
    if (limit && category) {
      const packages = await Package.find({ category })
        .limit(+limit)
        .skip(skip);
      new ResponseHandler(res, 200, "packages", "ok", packages);
      return;
    }

    const packages = await Package.find();
    new ResponseHandler(res, 200, "packages", "ok", packages);
  }
);

export const getSinglePackage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const singlePackage = await Package.findById(id);
    new ResponseHandler(res, 200, "single package", "ok", singlePackage);
  }
);

interface PackageBody {
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  image?: string;
  size?: "sm" | "md" | "lg";
  category?: string;
}

export const createPackage = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const packageBody: PackageBody = req.body;
    if (!packageBody) {
      new ResponseHandler(res, 400, "All fields required", "not okay", null);
      return;
    }
    const newPackage = await Package.create(packageBody);
    new ResponseHandler(res, 201, "new package", "ok", newPackage);
  }
);

export const updatePackage = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newUpdatedPackage: PackageBody = {};
    const { id } = req.params;
    const {
      category,
      description,
      image,
      price,
      quantity,
      size,
      title,
    }: PackageBody = req.body;

    if (category) newUpdatedPackage["category"] = category;
    if (title) newUpdatedPackage["title"] = title;
    if (size) newUpdatedPackage["size"] = size;
    if (description) newUpdatedPackage["description"] = description;
    if (price) newUpdatedPackage["price"] = price;
    if (quantity) newUpdatedPackage["quantity"] = quantity;
    if (image) newUpdatedPackage["image"] = image;

    await Package.findByIdAndUpdate(id, newUpdatedPackage, { new: true });
    res.status(200).json({ id, message: "package updated" });
    return;
  }
);

export const deletePackage = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(id);
    new ResponseHandler(res, 200, "package deleted", "ok", deletedPackage);
  }
);

import { NextFunction, Request, Response } from "../app.js";
import { config } from "../config/configuration.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ResponseHandler } from "../utils/responseHandler.js";
import { Package } from "./package.model.js";

interface PackageBody {
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  image?: string;
  size?: "sm" | "md" | "lg";
  category?: string;
}

export const getAllPackages = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const skip = parseInt(req.query.skip as string) || 0;
    const { limit, category } = req.query;

    let packages;
    if (limit && category) {
      packages = await Package.find({ category })
        .limit(Number(limit))
        .skip(skip);
    } else {
      packages = await Package.find().skip(skip);
    }

    new ResponseHandler(res, 200, "packages", "ok", packages);
  }
);

export const getSinglePackage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const singlePackage = await Package.findById(id);

    if (!singlePackage) {
      new ResponseHandler(res, 404, "Package not found", "not ok", null);
      return;
    }

    new ResponseHandler(res, 200, "single package", "ok", singlePackage);
  }
);

export const createPackage = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { category, description, price, quantity, size, title }: PackageBody =
      req.body.form_data ? JSON.parse(req.body.form_data) : {};

    if (![category, description, price, quantity, size, title].every(Boolean)) {
      new ResponseHandler(res, 400, "All fields are required", "not ok", null);
      return;
    }

    const newPackage = await Package.create({
      category,
      description,
      price,
      quantity,
      size,
      title,
      image: `${config.url}:${config.port}/images/${req.file?.filename}`,
    });

    new ResponseHandler(res, 201, "new package", "ok", newPackage);
  }
);

export const updatePackage = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;

    const { category, description, price, quantity, size, title }: PackageBody =
      req.body;

    const updatedPackage: PackageBody = {
      category,
      description,
      price,
      quantity,
      size,
      title,
      image: req.file
        ? `${config.url}:${config.port}/images/${req.file.filename}`
        : undefined,
    };

    const updatedPackageData = await Package.findByIdAndUpdate(
      id,
      updatedPackage,
      { new: true }
    );

    if (!updatedPackageData) {
      new ResponseHandler(res, 404, "Package not found", "not ok", null);
      return;
    }

    new ResponseHandler(res, 200, "Package updated", "ok", updatedPackageData);
  }
);

export const deletePackage = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;

    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
      new ResponseHandler(res, 404, "Package not found", "not ok", null);
      return;
    }

    new ResponseHandler(res, 200, "Package deleted", "ok", deletedPackage);
  }
);

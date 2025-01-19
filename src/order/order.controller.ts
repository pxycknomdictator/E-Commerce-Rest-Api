import { NextFunction, Request, Response } from "../app.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addNewOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ status: "New Order Added" });
  }
);

export const showAllOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ status: "All your orders" });
  }
);

export const getSingleOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return res.status(200).json({ status: "Single Order" });
  }
);

export const updateOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return res
      .status(204)
      .json({ status: `Order Id: ${id} Update Successfully` });
  }
);

export const deleteOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return res
      .status(205)
      .json({ status: `Order Id: ${id} delete Successfully` });
  }
);

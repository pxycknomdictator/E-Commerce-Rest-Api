import { NextFunction, Response } from "../app.js";
import { RequestPayload } from "../middlewares/authentication.js";
import { User } from "../user/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ResponseHandler } from "../utils/responseHandler.js";
import { Order } from "./order.model.js";

export const addNewOrder = asyncHandler(
  async (req: RequestPayload, res: Response, next: NextFunction) => {
    const { packageId } = req.body;
    const userId = req.user?._id;

    if (!packageId) {
      new ResponseHandler(res, 400, "Package ID are required", "not okay");
      return;
    }

    const newOrder = await Order.create({
      userId,
      packageId,
    });

    await User.findByIdAndUpdate(userId, { $push: { packages: packageId } });
    new ResponseHandler(res, 201, "New Order Added", "ok", newOrder);
  }
);

export const showAllOrders = asyncHandler(
  async (req: RequestPayload, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId) {
      new ResponseHandler(res, 401, "Not authenticated user", "not okay");
      return;
    }
    const orders = await Order.find({ userId });
    new ResponseHandler(res, 200, "All Orders", "ok", orders);
    return;
  }
);

export const getSingleOrder = asyncHandler(
  async (req: RequestPayload, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const { id } = req.params;
    if (!userId) {
      new ResponseHandler(res, 401, "Not authenticated user", "not okay");
      return;
    }
    const order = await Order.findOne({ _id: id }).populate("userId packageId");
    if (!order) {
      new ResponseHandler(res, 404, "Order not found", "not okay");
      return;
    }
    new ResponseHandler(res, 200, "Single Order", "ok", order);
  }
);

export const updateOrder = asyncHandler(
  async (req: RequestPayload, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { packageId, status } = req.body;

    if (!packageId && !status) {
      new ResponseHandler(
        res,
        400,
        "At least one field (packageId or status) must be provided",
        "not okay"
      );
      return;
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { packageId, status },
      { new: true }
    );

    if (!order) {
      new ResponseHandler(res, 404, "Order not found", "not okay");
      return;
    }

    new ResponseHandler(
      res,
      200,
      `Order Id: ${id} Updated Successfully`,
      "ok",
      order
    );
  }
);

export const deleteOrder = asyncHandler(
  async (req: RequestPayload, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?._id;
    const order = await Order.findById(id);
    if (!order) {
      new ResponseHandler(res, 404, "Order not found", "not okay");
      return;
    }

    const { packageId } = order;
    await User.findByIdAndUpdate(
      userId,
      { $pull: { packageIds: packageId } },
      { new: true }
    );

    await Order.findByIdAndDelete(id);

    new ResponseHandler(res, 200, `Order Id: ${id} Deleted Successfully`, "ok");
  }
);

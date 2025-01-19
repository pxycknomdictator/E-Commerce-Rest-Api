import { Router } from "express";
import {
  addNewOrder,
  showAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} from "./order.controller.js";

const orderRouter = Router();

orderRouter.route("/orders").get(showAllOrders).post(addNewOrder);

orderRouter
  .route("/orders/:id")
  .get(getSingleOrder)
  .put(updateOrder)
  .delete(deleteOrder);

export default orderRouter;

import { Router } from "express";
import {
  addNewOrder,
  showAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} from "./order.controller.js";
import { authenticationValidator } from "../middlewares/authentication.js";

const orderRouter = Router();

orderRouter
  .route("/orders")
  .get(authenticationValidator, showAllOrders)
  .post(authenticationValidator, addNewOrder);

orderRouter
  .route("/orders/:id")
  .get(authenticationValidator, getSingleOrder)
  .put(authenticationValidator, updateOrder)
  .delete(authenticationValidator, deleteOrder);

export default orderRouter;

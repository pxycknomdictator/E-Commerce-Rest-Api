import { Router } from "express";
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
} from "./package.controller.js";

const packageRouter = Router();

packageRouter.route("/packages").get(getAllPackages).post(createPackage);
packageRouter
  .route("/packages/:id")
  .get(getSinglePackage)
  .put(updatePackage)
  .delete(deletePackage);

export default packageRouter;

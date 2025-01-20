import { Router } from "express";
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
} from "./package.controller.js";
import { authenticationValidator } from "../middlewares/authentication.js";
import { upload } from "../middlewares/fileUpload.js";

const packageRouter = Router();

packageRouter
  .route("/packages")
  .get(authenticationValidator, getAllPackages)
  .post(authenticationValidator, upload.single("image"), createPackage);
packageRouter
  .route("/packages/:id")
  .get(authenticationValidator, getSinglePackage)
  .put(authenticationValidator, upload.single("image"), updatePackage)
  .delete(authenticationValidator, deletePackage);

export default packageRouter;

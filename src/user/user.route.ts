import { Router } from "express";
import { register, login, logout } from "./user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.get("/logout", logout);

export default userRouter;

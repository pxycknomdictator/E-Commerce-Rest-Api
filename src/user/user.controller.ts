import { NextFunction, Request, Response } from "../app.js";
import { generateToken } from "../middlewares/authentication.js";
import {
  passwordGenerator,
  passwordValidator,
} from "../middlewares/passwordManager.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ResponseHandler } from "../utils/responseHandler.js";
import { User } from "./user.model.js";

interface UserBody {
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export const register = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { username, email, password, phone, role }: UserBody = req.body;

    if (
      ![username, email, password, phone, role].every(
        (input) => input.trim() !== ""
      )
    ) {
      new ResponseHandler(res, 400, "All fields required", "not okay", null);
      return;
    }

    const isAlreadyExists = await User.findOne({ email });

    if (isAlreadyExists) {
      new ResponseHandler(res, 400, "Email already exists", "not okay", null);
      return;
    }

    const hash = await passwordGenerator(password);

    const newUser = await User.create({
      username,
      email,
      password: hash,
      phone,
      role,
    });

    new ResponseHandler(res, 201, "new user register", "ok", newUser);
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password }: UserBody = req.body;

    if (![email, password].every((input) => input.trim() !== "")) {
      new ResponseHandler(res, 400, "All fields required", "not okay", null);
      return;
    }

    const isExists = await User.findOne({ email }).select("+password");

    if (!isExists) {
      new ResponseHandler(res, 400, "Credentials error", "not okay", null);
      return;
    }

    const isPasswordMatched = await passwordValidator({
      password,
      hash: isExists.password,
    });

    if (!isPasswordMatched) {
      new ResponseHandler(res, 400, "Credentials error", "not okay", null);
      return;
    }

    const token = generateToken({
      _id: isExists._id,
      username: isExists.username,
      email: isExists.email,
    });

    return res
      .cookie("access_token", token, { httpOnly: true })
      .json({ message: "user login", success: true });
  }
);

export const logout = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    return res.clearCookie("access_token").json({ message: "Logout" });
  }
);

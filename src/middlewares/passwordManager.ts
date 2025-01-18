import * as argon2 from "argon2";
import { argonOptions } from "../utils/constant.js";

export const passwordGenerator = (password: string): Promise<string> => {
  return argon2.hash(password, argonOptions);
};

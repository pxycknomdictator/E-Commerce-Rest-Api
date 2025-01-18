import * as argon2 from "argon2";
import { argonOptions } from "../utils/constant.js";

interface PasswordPayload {
  password: string;
  hash: string;
}

export const passwordGenerator = async (password: string): Promise<string> => {
  return await argon2.hash(password, argonOptions);
};

export const passwordValidator = async ({
  password,
  hash,
}: PasswordPayload): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

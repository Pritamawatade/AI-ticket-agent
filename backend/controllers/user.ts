import jwt from "jsonwebtoken";
import User, { type User as UserModel } from "../models/user";
import { inngest } from "../inggest/client";
import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      role,
      skills,
    }: { email: string; password: string; role: string; skills: string[] } =
      req.body;
    const user = await User.create({ email, password, role, skills });
  } catch (error: any) {
    console.log(`error in register ${error}`);
    throw new Error("error in register");
  }
};

import { Request, Response } from "express";

export const signUpController = (req: Request, res: Response) => {
  res.send("Sign up route");
}
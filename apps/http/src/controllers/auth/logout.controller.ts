import { Request, Response } from "express";

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "User Logged Out"
  })
}
import { Request, Response } from "express"

export const signUpController = (req: Request, res: Response) => {
  const { username, email, password } = req.body;
}

export const signInController = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Sign In Controller"
  });
}

export const createRoomController = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Create Room Controller"
  });
}
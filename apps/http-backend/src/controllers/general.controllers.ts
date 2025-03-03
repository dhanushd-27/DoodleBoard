import { Request, Response } from "express"
import { signInSchema, signUpSchema } from "@repo/common/type"
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { prisma } from '@repo/db/prisma';

export const signUpController = async (req: Request, res: Response) => {
  const isValid = signUpSchema.safeParse(req.body);

  if(!isValid.success) {
    res.status(400).json({
      message: "Invalid Request Body"
    })
    return;
  }

  const { username, email, password } = isValid.data;

  const hashPassword = await argon2.hash(password);
  
  await prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword
    }
  })

  res.status(200).json({
    message: "Sign Up Controller",
    body: req.body
  });
}

export const signInController = async (req: Request, res: Response) => {
  const isValid = signInSchema.safeParse(req.body);

  if(!isValid.success) {
    res.status(400).json({
      message: "Invalid Request Body"
    })
    return;
  }

  const { email, password } = isValid.data;
  console.log({
    email, password
  });

  const hashedPassword = await argon2.hash(password);

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string);

  res.status(200).json({
    message: "Sign In Controller",
    token,
    hashedPassword
  });
}

export const createRoomController = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Create Room Controller"
  });
}
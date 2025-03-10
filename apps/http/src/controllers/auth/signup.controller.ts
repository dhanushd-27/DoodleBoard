import { prisma } from "@repo/db/prisma";
import { signUpSchema } from "@repo/types/auth";
import { Request, Response } from "express";
import argon2 from 'argon2';

export const signUpController = async (req: Request, res: Response) => {
  const parsedData = signUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }

  try {
    const isFound = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email,
      }
    })
  
    if (isFound) {
      res.status(403).json({
        message: "User already exists",
      });
      return;
    }

    const hashPassword = await argon2.hash(parsedData.data.password);
  
    const user = await prisma.user.create({
      data: {
        name: parsedData.data.username,
        email: parsedData.data.email,
        password: hashPassword,
      }
    });
  
    res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
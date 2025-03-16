import { Request, Response } from "express";
import { loginSchema } from "@repo/types/auth";
import { prisma } from "@repo/db/prisma";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const loginController = async (req: Request, res: Response) => {
  const parsedData = loginSchema.safeParse(req.body);

  if(!parsedData.success) {
    res.status(400).json({
      message: "Invalid data"
    });
    return;
  }

  try {
    const isFound = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email
      }
    });
  
    if(!isFound) {
      res.status(404).json({
        message: "User not found"
      });
      return;
    }

    const isValidPassword = await argon2.verify(isFound.password, parsedData.data.password);
  
    if(!isValidPassword) {
      res.status(401).json({
        message: "Invalid password"
      });
      return;
    }
  
    const token = jwt.sign({
      email: isFound.email,
      name: isFound.name,
      id: isFound.id
    }, process.env.JWT_SECRET as string);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logged in",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
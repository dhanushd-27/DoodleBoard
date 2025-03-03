import { Request, Response } from "express"
import { createRoomSchema, signInSchema, signUpSchema } from "@repo/common/type"
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

  const isFound = await prisma.user.findUnique({
    where: {
      email: isValid.data.email
    }
  });

  if(isFound) {
    res.status(411).json({
      message: "User Already Exists"
    });
    return
  }

  const { username, email, password } = isValid.data;

  const hashPassword = await argon2.hash(password);
  
  await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashPassword
    }
  })

  res.status(200).json({
    message: "Sign Up Controller",
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

  const isFound = await prisma.user.findUnique({
    where: {
      email: isValid.data.email
    }
  });

  if(!isFound) {
    res.status(400).json({
      message: "User Not Found"
    });
    return
  }

  const isVerified = await argon2.verify(isFound.password, isValid.data.password);

  if(!isVerified) {
    res.status(400).json({
      message: "Invalid Password"
    });
    return;
  }

  const body = {
    email: isFound.email,
    id: isFound.id
  }

  const token = jwt.sign(body, process.env.JWT_SECRET as string);


  res.status(200).json({
    message: "Sign In Controller",
    token
  });
}

export const createRoomController = async (req: Request, res: Response) => {
  const parsedData = createRoomSchema.safeParse(req.body);

  if(!parsedData.success) {
    res.status(400).json({
      message: "Invalid Request Body"
    })
    return;
  }

  const roomFound = await prisma.room.findUnique({
    where: {
      slug: parsedData.data.slug
    }
  });

  if(roomFound) {
    res.status(400).json({
      message: "Room Already Exists"
    });
    return;
  }

  const userId = req.user.id;

  await prisma.room.create({
    data: {
      slug: parsedData.data.slug,
      adminId: userId
    }
  });

  res.status(200).json({
    message: "Create Room Controller Successfull"
  });
}
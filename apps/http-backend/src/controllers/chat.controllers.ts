import { prisma } from "@repo/db/prisma";
import { Request, Response } from "express";
import { createRoomSchema, RoomChatParamsSchema } from "@repo/common/type";

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

export const getRoomChatController = async (req: Request, res: Response) => {
  const parsedData = RoomChatParamsSchema.safeParse(req.params);

  if(!parsedData.success) {
    res.status(400).json({
      message: "Invalid Request Params"
    });
    return;
  }

  const isFound = await prisma.room.findUnique({
    where: {
      slug: parsedData.data.slug
    }
  });

  if(!isFound) {
    res.status(404).json({
      message: "Room Not Found"
    });
    return;
  }

  const chat = await prisma.room.findFirst({
    where: {
      slug: parsedData.data.slug
    },
    include: {
      chats: true
    }
  });

  res.status(200).json({
    message: "Get Room Chat Controller",
    data: chat?.chats
  });
}

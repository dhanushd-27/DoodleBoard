import { prisma } from "@repo/db/prisma";
import { Request, Response } from "express";

// clear chats
// get chats
export const getChats = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { id } = req.user;

  if(!slug) {
    res.status(400).json({
      message: "Room slug is required"
    });
    return;
  }

  const room = await prisma.room.findFirst({
    where: {
      slug,
      adminId: id
    }
  });

  if(!room) {
    res.status(404).json({
      message: "Room not found"
    });
    return;
  }

  const chats = await prisma.shape.findFirst({
    where: {
      roomId: room.id
    }
  });

  res.status(200).json({
    message: "Chats fetched successfully",
    payload: chats
  });
}

export const removeShape = async (req: Request, res: Response) => {
  const { slug, shapeId } = req.params;

  if(!slug && !shapeId) {
    res.status(400).json({
      message: "Room slug and shapeId is required"
    });
    return;
  }

  try {
    const room = await prisma.room.findFirst({
      where: {
        slug,
      }
    });
  
    if(!room) {
      res.status(404).json({
        message: "Room not found"
      });
      return;
    }

    await prisma.shape.delete({
      where: {
        id: shapeId,
        roomId: room.id
      }
    });

    res.status(200).json({
      message: "Shape removed successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid Parameters"
    });
  }


  // check if the user is part of the room for which slug is provided
  // if yes remove shape, if not don't remove shape
}
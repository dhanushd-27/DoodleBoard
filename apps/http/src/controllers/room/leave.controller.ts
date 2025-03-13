// Remove user from the room with given Id

import { prisma } from "@repo/db/prisma";
import { Request, Response } from "express";

export const leaveRoomController = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { id } = req.user;

  if(!slug) {
    res.status(400).json({
      message: "Room slug is required"
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

    const user = await prisma.user.findFirst({
      where: {
        id
      },
      include: {
        memberOf: true
      }
    });

    if(!user) {
      res.status(404).json({
        message: "User not found"
      });
      return;
    }
    
    // Logic to remove user from the room
    // Logic to remove room from the user
  } catch (error) {
    
  }
}
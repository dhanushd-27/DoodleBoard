// Remove user from the room with given Id

import { prisma } from "@repo/db/prisma";
import { Status } from "@repo/types/status";
import { Request, Response } from "express";

export const exitRoomController = async (req: Request, res: Response) => {
 try {
  const { slug } = req.params;
  const { id } = req.user;

  if(!slug) {
    res.status(400).json({
      message: "Room slug is required"
    });
    return;
  }

  await prisma.room.update({
    where: { slug },
    data: { 
      members: {
        disconnect: { id }
      }
    }
  })

 } catch (error) {
  res.status(Status.ServerFailed).json({
    message: "Server Error"
  })
 }
}
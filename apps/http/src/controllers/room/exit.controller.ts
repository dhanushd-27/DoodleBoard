// Remove user from the room with given Id

import { prisma } from "@repo/db/prisma";
import { Status } from "@repo/types/status";
import { Request, Response } from "express";

export const exitRoomController = async (req: Request, res: Response) => {
 try {
  const { roomId } = req.params;
  const { id } = req.user;

  if(!roomId) {
    res.status(400).json({
      message: "Room slug is required"
    });
    return;
  }

  await prisma.room.update({
    where: { id: roomId },
    data: { 
      members: {
        disconnect: { id }
      }
    }
  })

  res.status(Status.Success).json({
    message: "Exited Room Successfully"
  })
 } catch (error) {
  res.status(Status.Failed).json({
    message: "Member not found"
  })
 }
}
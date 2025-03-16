import { prisma } from "@repo/db/prisma";
import { Status } from "@repo/types/status";
import { Request, Response } from "express";

export const joinRoomController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const id = req.params.roomId;

    if(!id) {
      res.status(Status.NotFound).json({
        message: "Room Id not found"
      })
      return;
    }

    const room = await prisma.room.findFirst({
      where: {
        id
      }
    });

    if(!room) {
      res.status(Status.NotFound).json({
        message: "Room Not Found"
      })
    }

    await prisma.room.update({
      where: {
        id,
      }, 
      data: {
        members: {
          connect: { id: userId }
        }
      }
    });

    res.status(Status.Success).json({
      message: "Member joined successfully"
    });
  } catch (error) {
    res.status(Status.ServerFailed).json({
      message: "Server Failed"
    })
  }
}
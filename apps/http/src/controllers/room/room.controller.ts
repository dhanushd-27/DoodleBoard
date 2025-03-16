import { prisma } from "@repo/db/prisma";
import { Request, Response } from "express";
import { Status } from "@repo/types/status";

export const getRoomIdController = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    if(!slug) {
      res.status(Status.NotFound).json({
        message: "Slug is required"
      });
      return;
    }

    const room = await prisma.room.findFirst({
      where: {
        slug,
      }
    });

    if(!room) {
      res.status(Status.NotFound).json({
        message: "No room found with given slug"
      })
      return;
    }

    res.status(Status.Success).json({
      message: "Room Found",
      payload: {
        roomId: room.id
      }
    })
  } catch (error) {
    res.status(Status.ServerFailed).json({
      message: "Server error occured"
    })
  }
}

export const getChatsController = async (req: Request, res: Response) => {
  try {
    const roomId = req.params.roomId;

    if(!roomId) {
      res.status(Status.NotFound).json({
        message: "Room Id is Required"
      })
      return;
    }

    const shapes = await prisma.shape.findMany({
      where: {
        roomId: roomId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(Status.Success).json({
      message: "Shapes fetched successfully",
      payload: {
        shapes
      }
    });
  } catch (error) {
    res.status(Status.ServerFailed).json({
      message: "Server Down"
    })
  }
}

export const removeShapeController = async (req: Request, res: Response) => {
  const { slug, shapeId } = req.params;

  if(!slug && !shapeId) {
    res.status(Status.InvalidData).json({
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
      res.status(Status.NotFound).json({
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

    res.status(Status.Success).json({
      message: "Shape removed successfully"
    });
  } catch (error) {
    res.status(Status.Failed).json({
      message: "Invalid Parameters"
    });
  }
}

export const roomMembersController = async (req: Request, res: Response) => {
  try {
    const id = req.params.roomId;
    
    const members = await prisma.room.findFirst({
      where: {
        id
      },
      select: {
        members: true
      }
    });

    res.status(Status.Success).json({
      members
    })
  } catch (error) {
    res.status(Status.ServerFailed).json({
      message: "Server Failed"
    })
  }
}
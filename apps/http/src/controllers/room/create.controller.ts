import { prisma } from "@repo/db/prisma";
import { Request, Response } from "express";
import randomstring from "randomstring";

// as an admin create room in the database
export const createRoomController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { name } = req.body;

    if(!name) {
      res.status(400).json({
        message: "Room name is required"
      });
      return;
    };

    const roomSlug = randomstring.generate(7);

    const room = await prisma.room.create({
      data: {
        name,
        slug: roomSlug,
        adminId: id
      }
    });

    res.status(201).json({
      message: "Room created successfully",
      payload: {
        slug: room.slug
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating room",
      error: error
    });
  }
}
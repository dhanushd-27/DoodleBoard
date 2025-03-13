import { prisma } from "@repo/db/prisma";
import { Request, Response } from "express";
import randomstring from "randomstring";

// as an admin create room in the database
const createRoomController = async (req: Request, res: Response) => {
  // get the user id from the request
  // get the room name from the request
  // create a room in the database
  // return the room
  try {
    const { id } = req.user;
    const { name } = req.body;

    if(!name) {
      return res.status(400).json({
        message: "Room name is required"
      });
    };

    const roomSlug = randomstring.generate(7);

    const room = await prisma.room.create({
      data: {
        name,
        slug: roomSlug,
        adminId: id
      }
    });

    const roomMember = await prisma.user.update({
      where: {
        id
      },
      data: {
        adminOf: {
          connect: {
            id: room.id
          }
        }
      }
    });

    res.status(201).json({
      message: "Room created successfully",
      payload: room
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating room",
      error: error
    });
  }
}
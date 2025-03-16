// List of all rooms I am part of - Show in Dashboard

import { prisma } from "@repo/db/prisma";
import { Status } from "@repo/types/status";
import { Request, Response } from "express";

export const listRoomsController = async (req: Request, res: Response) => {
  // get all rooms where the user is part of
  // return the list of rooms
  try {
    const { id } = req.user;
    const rooms = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        memberOf: true
      }
    });

    res.status(Status.Success).json({
      message: "Rooms fetched successfully",
      payload: {
        rooms: rooms?.memberOf
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching rooms",
      error: error
    });
  }
}
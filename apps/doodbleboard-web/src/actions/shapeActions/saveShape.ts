"use server"

import { prisma } from "@repo/db/prisma";

type Props = {
  roomId: string,
  authorId: string,
  message: string
}

export async function saveShape({ roomId, authorId, message }: Props) {
  try {
    await prisma.shape.create({
      data: {
        roomId: roomId,
        authorId,
        message: message,
      }
    });
  } catch (error) {
    console.error("Prisma Error:", error);
  }
}
import z from "zod";

export const shareSchema = z.object({
  roomId: z.string(),
  type: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

export const joinSchema = z.object({
  roomId: z.string(),
});

export const leaveSchema = joinSchema;

export interface User {
  email: string;
  name: string;
  id: string;
  iat: number;
}
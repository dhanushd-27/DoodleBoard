import z from "zod";

export const signUpSchema  = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email().min(6).max(255),
  password: z.string().min(6).max(255),
})

export const signInSchema = z.object({
  email: z.string().email().min(6).max(255),
  password: z.string().min(6).max(255),
});

export const createRoomSchema = z.object({
  slug: z.string().min(6).max(255),
});

export const RoomChatSchema = z.array(
  z.object({
    id: z.number().nonnegative(),
    message: z.string(),
    userId: z.string(),
  })
);

export const RoomChatParamsSchema = z.object({
  slug: z.string().min(1).max(255),
})
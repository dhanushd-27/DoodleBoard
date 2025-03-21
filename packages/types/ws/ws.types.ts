import z from "zod";

// Event Schema Below
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
// Event Schema Above


export const wsShareSchema = z.object({
  roomId: z.string(),
  type: z.string(),
  payload: z.string()
})

export type wsShare = z.infer<typeof wsShareSchema>;

export const wsEvent = {
  Failed: "failed", // When a WS message fails
  Share: "share", // To share shape data across the ws server
  Join: "join", // Event Join Room
  Leave: "leave", // Event Leave Room
  Joined: "joined_room", // Event You joined a room
  UserJoined: "user_joined", // When a new user joined a room
  UserLeft: "user_left", // When a user left the room
} as const;

export type wsEvent = keyof typeof wsEvent;

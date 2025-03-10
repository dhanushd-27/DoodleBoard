import { shareSchema, User } from "@repo/types/ws";
import { WebSocket, WebSocketServer } from "ws";
import { userCollection } from "../config/store";

export const handleShare = (socket: WebSocket, wss: WebSocketServer, payload: any, userDetails: User ) => {
  try {
    const parsedData = shareSchema.safeParse(payload);

    if(!parsedData.success){
      socket.send("Invalid payload");
      return;
    }

    const { roomId, type, x, y, width, height } = parsedData.data;
    const { id, email, name } = userDetails;

    const user = userCollection.find(user => user.userId === id);

    if(!user) {
      socket.send("User not found");
      return;
    }

    const room = user.rooms.includes(roomId);

    if(!room) {
      socket.send("Room not found");
      return;
    }

    userCollection.map(user => {
      if(user.rooms.includes(roomId)) {
        user.socket.send(JSON.stringify({
          event: "share",
          payload: {
            type,
            x,
            y,
            width,
            height
          }
        }))
      }
    })
  } catch (error) {
    socket.send("Invalid payload");
    return;
  }
}
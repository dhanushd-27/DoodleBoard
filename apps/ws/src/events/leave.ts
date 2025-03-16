import { leaveSchema, User } from "@repo/types/ws"
import { WebSocketServer, WebSocket } from "ws"
import { userCollection } from "../config/store";

export const handleLeave = ( socket: WebSocket, wss: WebSocketServer, payload: any, userDetails: User ) => {
  try {
    const parsedData = leaveSchema.safeParse(payload);

    if(!parsedData.success) {
      socket.send("Invalid Data");
      return;
    }

    const { roomId } = parsedData.data;
    const { id } = userDetails;

    const user = userCollection.find(u => u.userId = id);

    if(!user) {
      socket.send("User not found");
      return;
    }
    user.rooms = user.rooms.filter(r => r !== roomId);
    socket.send("User left room " + roomId);
  } catch (error) {
    socket.send("Invalid payload");
    return;
  }
}
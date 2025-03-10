import { WebSocket, WebSocketServer } from "ws"
import { joinSchema, User } from '@repo/types/ws';
import { userCollection } from "../config/store";


export const handleJoin = ( socket: WebSocket, wss: WebSocketServer, payload: any, userDetails: User ) => {
  try {
    const parsedData = joinSchema.safeParse(payload);

    if(!parsedData.success){
      socket.send("Invalid payload");
      return;
    }

    const { roomId } = parsedData.data;
    const { id, email, name } = userDetails;

    const user = userCollection.find(user => user.userId === id);

    if(!user) {
      userCollection.push({
        userId: id,
        socket,
        rooms: [roomId]
      })

      socket.send("Joined room" + roomId);
      return;
    }

    user.rooms.push(roomId);
    socket.send("Joined room" + roomId);
  } catch (error) {
    socket.send("Invalid payload");
    return;
  }
}
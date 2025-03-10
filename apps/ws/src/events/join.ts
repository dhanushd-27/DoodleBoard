import { WebSocket, WebSocketServer } from "ws"
import { joinSchema } from '@repo/types/ws';
import { userCollection } from "../config/store";


export const handleJoin = ( socket: WebSocket, wss: WebSocketServer, payload: any ) => {
  try {
    const parsedData = joinSchema.safeParse(payload);

    if(!parsedData.success){
      socket.send("Invalid payload");
      return;
    }

    const { roomId, userId } = parsedData.data;

    const user = userCollection.find(user => user.userId === userId);

    if(!user) {
      userCollection.push({
        userId,
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
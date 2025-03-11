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

    if(user) {
      if(user.rooms.includes(roomId)) {
        socket.send("Already joined room");
        return;
      }
    }

    if(!user) {

      userCollection.push({
        userId: id,
        socket,
        rooms: [roomId]
      })

      userCollection.map(user => {
        if(user.rooms.includes(roomId)) {
          user.socket.send(JSON.stringify({
            event: "user_joined",
            payload: {
              roomId,
              user: {
                id,
                email,
                name
              }
            }
          }))
        }
      })

      socket.send(JSON.stringify({
        event: "joined_room",
        payload: {
          roomId
        }
      }));
      return;
    }

    user.rooms.push(roomId);
    socket.send("Joined room" + roomId);
  } catch (error) {
    socket.send("Invalid payload");
    return;
  }
}
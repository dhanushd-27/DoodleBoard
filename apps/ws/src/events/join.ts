import { WebSocket, WebSocketServer } from "ws"
import { joinSchema, User } from '@repo/types/ws';

interface wsUser {
  userId: string,
  socket: WebSocket,
  rooms: string[]
}

export let userCollection: wsUser[] = [];

export const handleJoin = ( socket: WebSocket, wss: WebSocketServer, payload: any, userDetails: User ) => {
  try {
    const parsedData = joinSchema.safeParse(payload);

    if(!parsedData.success){
      socket.send(JSON.stringify({
        event: "failed",
        message: "Invalid Payload"
      }));
      return;
    }

    const { roomId } = parsedData.data;
    const { id } = userDetails;

    userCollection = userCollection.filter(u => u.userId != id);

    userCollection.push({
      userId: id,
      socket,
      rooms: [roomId]
    })

    socket.send(JSON.stringify({
      event: "joined_room",
      payload: {
        roomId
      }
    }));

    console.log(userCollection.map(u => u.userId));

    // send notification to everyone
    userCollection.map(user => {
      if(user.rooms.includes(roomId) && user.userId != id) {
        user.socket.send(JSON.stringify({
          event: "user_joined",
          payload: {
            roomId,
            user: {
              id
            }
          }
        }))
      }
    })
  } catch (error) {
    socket.send(JSON.stringify({
      event: "failed",
      payload: {
        message: "Invalid Data"
      }
    }));
    return;
  }
}
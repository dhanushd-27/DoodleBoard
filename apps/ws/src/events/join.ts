import { joinSchema, wsEvent } from "@repo/types/ws";
import { WebSocket, WebSocketServer } from "ws"
import { User } from '@repo/types/auth';

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
        event: wsEvent.Failed,
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
      event: wsEvent.Joined,
      payload: {
        roomId
      }
    }));

    console.log(userCollection.map(u => u.userId));

    // send notification to everyone
    userCollection.map(user => {
      if(user.rooms.includes(roomId) && user.userId != id) {
        user.socket.send(JSON.stringify({
          event: wsEvent.UserJoined,
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
      event: wsEvent.Failed,
      payload: {
        message: "Invalid Data"
      }
    }));
    return;
  }
}
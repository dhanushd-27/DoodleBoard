import { WebSocket, WebSocketServer } from "ws"
import { joinSchema, User } from '@repo/types/ws';
import { userCollection } from "../config/store";


export const handleJoin = ( socket: WebSocket, wss: WebSocketServer, payload: any, userDetails: User ) => {
  try {
    const parsedData = joinSchema.safeParse(payload);
    console.log(parsedData.data)

    if(!parsedData.success){
      socket.send("Invalid payload");
      return;
    }

    const { roomId } = parsedData.data;
    const { id } = userDetails;

    const user = userCollection.find(user => user.userId === id);

    if(!user) {
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
      return;
    }

    user.rooms.push(roomId);
    // send notification to everyone
    userCollection.map(user => {
      if(user.rooms.includes(roomId)) {
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
    socket.send("Joined room" + roomId);
  } catch (error) {
    socket.send("Invalid payload");
    return;
  }
}
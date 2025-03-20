import { shareSchema, User } from "@repo/types/ws";
import { WebSocket, WebSocketServer } from "ws";
import { userCollection } from "./join";

export const handleShare = (socket: WebSocket, wss: WebSocketServer, payload: any, userDetails: User ) => {
  try {
    const parsedData = shareSchema.safeParse(payload);

    if(!parsedData.success){
      socket.send(JSON.stringify({
        event: "failed",
        payload: {
          message: "Invalid Data"
        }
      }));
      return;
    }

    const { roomId, type, x, y, width, height } = parsedData.data;
    const { id } = userDetails;

    const user = userCollection.find(user => user.userId === id);

    if(!user) {
      socket.send(JSON.stringify({
        event: "failed",
        payload: {
          message: "user not found"
        }
      }));
      return;
    }

    const room = user.rooms.includes(roomId);

    if(!room) {
      socket.send(JSON.stringify({
        event: "failed",
        payload: {
          message: "room not found"
        }
      }));
      return;
    }

    console.log(userCollection);

    userCollection.map(user => {
      if(user.rooms.includes(roomId) && user.userId != id) {
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
    socket.send(JSON.stringify({
      event: "failed",
      payload: {
        message: "Invalid Data"
      }
    }));
    return;
  }
}
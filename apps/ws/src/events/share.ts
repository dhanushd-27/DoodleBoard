import { User } from "@repo/types/ws";
import { WebSocket } from "ws";
import { userCollection } from "./join";
import { wsShareSchema } from '@repo/types/shapes';

export const handleShare = (socket: WebSocket, roomId: string, type: string, payload: any, userDetails: User ) => {
  try {
    const parsedData = wsShareSchema.safeParse({
      roomId,
      type,
      payload
    });

    if(!parsedData.success){
      socket.send(JSON.stringify({
        event: "failed",
        payload: {
          message: "Invalid Data"
        }
      }));
      return;
    }

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

    console.log(100);

    userCollection.map(user => {
      if(user.rooms.includes(roomId) && user.userId != id) {
        user.socket.send(JSON.stringify({
          event: "share",
          type,
          payload
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
import { leaveSchema, User } from "@repo/types/ws"
import { WebSocketServer, WebSocket } from "ws"
import { userCollection } from "./join";

export const handleLeave = ( socket: WebSocket, wss: WebSocketServer, payload: any, userDetails: User ) => {
  try {
    const parsedData = leaveSchema.safeParse(payload);

    if(!parsedData.success) {
      socket.send(JSON.stringify({
        event: "failed",
        payload: {
          message: "Invalid Data"
        }
      }));
      return;
    }

    const { roomId } = parsedData.data;
    const { id } = userDetails;

    const user = userCollection.find(u => u.userId = id);

    console.log(1443);

    if(!user) {
      socket.send(JSON.stringify({
        event: "failed",
        payload: {
          message: "User Not Found"
        }
      }));
      return;
    }
    user.rooms = user.rooms.filter(r => r !== roomId);
    socket.send(JSON.stringify({
      event: "user_left",
      payload: {
        roomId: roomId,
        userId: id
      }
    }));
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
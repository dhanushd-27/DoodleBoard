import { WebSocket, WebSocketServer } from "ws";
import { userCollection } from "../config/store";

export const handleChat = (socket: WebSocket, wss: WebSocketServer) => {
  try {
    socket.on("message", (message) => {
      const parsedData = JSON.parse(message.toString());

      if(parsedData.event === "chat") {
        const roomId = parsedData.payload.roomId;

        userCollection.forEach(user => {
          if(user.rooms.includes(roomId)) {
            user.socket.send(JSON.stringify({
              event: "chat",
              data: {
                message: parsedData.payload.message,
                username: parsedData.payload.username
              }
            }));
          }
        })
      }
    })
  } catch (error) {
    console.error("Invalid JSON:", error);
    socket.send("Invalid JSON");
    socket.close();
  }
}
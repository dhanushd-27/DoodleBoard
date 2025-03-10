import { WebSocket, WebSocketServer } from "ws"
import { userCollection } from "../config/store";

export const handleJoin = (socket: WebSocket, wss: WebSocketServer) => {
  socket.on("message", (message) => {
    try {
      const parsedData = JSON.parse(message.toString());

      if(parsedData.event === "join") {
        
        // Check if room is provided
        if(!parsedData.payload.roomId) {
          socket.send(JSON.stringify({
            event: "error",
            data: {
              message: "Room is required"
            }
          }));
          return;
        }

        // Check if user is already in the collection
        if(!userCollection.find(user => user.userId === parsedData.payload.userId)) {
          const room = parsedData.payload.roomId;
          userCollection.push({
            userId: parsedData.payload.userId,
            socket,
            rooms: [room]
          });

          socket.send("Room joined");
          return;
        }

        // If user is already in the collection, add the room to the user's rooms
        const user = userCollection.find(user => user.userId === parsedData.payload.userId);

        user?.rooms.push(parsedData.payload.roomId);
        socket.send("Room joined");
      }
    } catch (error) {
      // Handle invalid JSON
      console.error("Invalid JSON:", error);
      socket.send("Invalid JSON");
      socket.close();
    }
  })
}
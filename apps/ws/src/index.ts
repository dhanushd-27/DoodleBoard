import { WebSocketServer, WebSocket } from "ws";
import "./config/env";
import { isValidToken } from "./utils/isValid";
import { handleJoin } from "./events/join";
import { handleShare } from "./events/share";
import { handleLeave } from "./events/leave";

const PORT = parseInt(process.env.PORT as string) || 8081;
const wss = new WebSocketServer({ port: PORT });

try {
  wss.on("connection", (socket, req) => {
    const url = req.url;

    const queryParams = new URLSearchParams(url?.split("?")[1]);
    const token = queryParams.get("token") as string;

    const userDetails = isValidToken(token); 
    if(!userDetails) {
      socket.send("Invalid token");
      return;
    }

    socket.on("message", (data) => {
      try {
        const payloadData = JSON.parse(data.toString());

        if(!payloadData.event) {
          socket.send("Event Type Required");
          return;
        }

        switch (payloadData.event) {
          case "join":
            handleJoin(socket, wss, payloadData.payload, userDetails );
            break;
          case "share":
            handleShare(socket, wss, payloadData.payload, userDetails);
            break;
          case "leave": 
            handleLeave(socket, wss, payloadData.payload, userDetails);
            break;
          default:
            socket.send("Invalid Event Type");
            break;
        }
      } catch (error) {
        socket.send("Invalid JSON");
      }
    })

    socket.send("Connected to server");
  });

  console.log(`Server is running on ws://localhost:${PORT}`);
} catch (error) {
  console.log(`Server connection failed: ${error}`);
}
import { WebSocketServer } from "ws";
import "./config/env";
import { isValidToken } from "./utils/isValid.js";
import { handleJoin } from "./events/join.js";
import { handleShare } from "./events/share.js";
import { handleLeave } from "./events/leave.js";
import { wsEvent } from "@repo/types/ws";

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
          case wsEvent.Join:
            handleJoin(socket, wss, payloadData.payload, userDetails );
            break;
          case wsEvent.Share:
            handleShare(socket, payloadData.roomId, payloadData.type, payloadData.payload, userDetails);
            break;
          case wsEvent.Leave: 
            handleLeave(socket, wss, payloadData.payload, userDetails);
            break;
          default:
            socket.send("Invalid Event Type");
            break;
        }
      } catch {
        socket.send("Invalid JSON");
      }
    })

    socket.send("Connected to server");
  });

  console.log(`Server is running on ws://localhost:${PORT}`);
} catch {
  console.log("Server connection failed");
}
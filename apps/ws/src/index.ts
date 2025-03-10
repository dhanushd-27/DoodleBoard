import { WebSocketServer, WebSocket } from "ws";
import "./config/env";
import { isValidToken } from "./utils/isValid";
import { handleJoin } from "./events/join";
import { handleChat } from "./events/share";

const PORT = parseInt(process.env.PORT as string) || 8081;
const wss = new WebSocketServer({ port: PORT });

try {
  wss.on("connection", (socket, req) => {
    const url = req.url;

    const queryParams = new URLSearchParams(url?.split("?")[1]);
    const token = queryParams.get("token") as string;

    if(!isValidToken(token)) {
      socket.send("Invalid token");
      socket.close();
    }

    handleJoin(socket, wss);
    handleChat(socket, wss);

    socket.send("Connected to server");
  });

  console.log(`Server is running on ws://localhost:${PORT}`);
} catch (error) {
  console.log(`Server connection failed: ${error}`);
}
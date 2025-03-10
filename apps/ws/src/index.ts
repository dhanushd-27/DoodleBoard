import { WebSocketServer, WebSocket } from "ws";
import { isValidToken } from "./utils/isValid";
import { configDotenv } from "dotenv";
configDotenv();

const PORT = parseInt(process.env.PORT as string) || 8081;
const wss = new WebSocketServer({ port: PORT });

interface User {
  userId: string,
  socket: WebSocket,
  rooms: string[]
}

const users: User[] = []

wss.on("connection", (socket, req) => {
  const url = req.url;

  const queryParams = new URLSearchParams(url?.split("?")[1]);
  const token = queryParams.get("token") as string;

  if(!isValidToken(token)) {
    socket.send("Invalid token");
    socket.close();
  }

  socket.on("message", (message) => {
    console.log(`Received message => ${message}`);
    socket.send(`Received message => ${message}`);
  });

  socket.send("Connected to server");
})
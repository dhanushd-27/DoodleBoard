import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT as string) || 8081;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Received message => ${message}`);
  });
  ws.send("Connected to server");
})
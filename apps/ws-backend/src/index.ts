import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket, request) => {
  const url = request.url;

  if(!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token: string = queryParams.get("token") as string;

  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if(!decoded || !decoded.email) {
    socket.close();
    return;
  }

  socket.on("message", (message) => {
    console.log(`Received message => ${message}`);
  })

  socket.on("close", () => {
    console.log("Thank you for joining us!");
  })

  socket.send("Hello, client!");
})
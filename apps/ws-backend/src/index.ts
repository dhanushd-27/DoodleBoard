import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { prisma } from "@repo/db/prisma";

dotenv.config();

interface userProps {
  roomIdArray: string[],
  userId: string,
  socket: WebSocket
}

const users: userProps[] = []

const JWT_SECRET = process.env.JWT_SECRET as string;

const wss = new WebSocketServer({ port: 8080 });

function verify(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if(typeof decoded == "string") return null;

    return decoded.id;
  } catch (error) {
    return null;
  }
}

wss.on("connection", (socket, request) => {
  const parsedData = new URLSearchParams(request.url?.split("?")[1]);

  const token = parsedData.get("token") || '';

  const userId: string | null = verify(token);
  
  if(!userId){
    socket.close(1008, "Invalid token");
  }

  socket.on("message", (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      const uId = userId as string;

      if(parsedData.type === "join"){
        const roomId: string = parsedData.payload.roomId as string;

        const isFound = users.find((room) => { room.userId === userId });

        if(!isFound) users.push({ 
          userId: uId,
          socket: socket,
          roomIdArray: [roomId]
        })

        const userRoom = users.find((user) => user.userId === uId) as userProps;
        
        userRoom.roomIdArray.push();

        socket.send(JSON.stringify(users));
      }

      if(parsedData.type === "chat"){
        const roomId = parsedData.payload.roomId as string;
        const message = parsedData.payload.message as string;

        users.map((userProps) => {
          if(userProps.roomIdArray.includes(roomId, 0)){
            userProps.socket.send(message);
          }
        })
      }

      if(parsedData.type === "leave"){
        const roomId = parsedData.payload.roomId as string;

        const userProps: userProps = users.find((userProps) => uId === userProps.userId) as userProps;

        userProps.roomIdArray = userProps.roomIdArray.filter((rId) => roomId !== rId);
        socket.send(JSON.stringify(userProps));
      }
    } catch (error) {
      socket.close(1008, "Invalid data: " + data);
    }
  })
  socket.on("error", (error) => {
    socket.send("Plese try again, Error occured: " + error);
  })  
});
// import { WebSocketServer } from "ws";
// import jwt from 'jsonwebtoken';
// import { JwtPayload } from 'jsonwebtoken';
// import dotenv from "dotenv";

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET as string;

// const wss = new WebSocketServer({ port: 8080 });

// wss.on("connection", (socket, request) => {
//   const url = request.url;

//   if(!url) {
//     return;
//   }

//   const queryParams = new URLSearchParams(url.split("?")[1]);
//   const token: string = queryParams.get("token") as string;

//   // const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

//   // if(!decoded || !decoded.email) {
//   //   socket.close();
//   //   return;
//   // }

//   socket.on("message", (message) => {
//     console.log(`Received message => ${message}`);
//     socket.send("Hello, boi I received your message!");
//   })

//   socket.on("close", () => {
//     console.log("Thank you for joining us!");
//   })

//   socket.send("Hello, client!");
// })

import { WebSocketServer, WebSocket } from "ws";

const ws = new WebSocketServer({ port: 8080 });

interface Users {
  socket: WebSocket;
  room: string;
}

let allSocket: Users[] = [];

ws.on("connection", (socket: WebSocket) => {
  socket.on("message", (data: string) => {
    const parsedData: any = JSON.parse(data);

    if (parsedData.type === "join") {
      allSocket.push({ socket, room: parsedData.payload.roomId });
    }
    if(parsedData.type === "chat") {
      const user = allSocket.find((user) => user.socket === socket);
      if(user) {
        allSocket.forEach((u) => {
          if(u.room === user.room) {
            u.socket.send(parsedData.payload.message);
          }
        })
      }
    }

    socket.on("error", (error) => {
      socket.send(`An error occurred: ${error}, Please try again`);
    })
  });
});
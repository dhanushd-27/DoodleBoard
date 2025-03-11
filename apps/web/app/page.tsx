'use client'

import { useEffect, useRef, useState } from "react"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRoYUBnbWFpbC5jb20iLCJuYW1lIjoiRGhhbnVzaCIsImlkIjoiY204MnIxODhwMDAwMHhqNXQ0cDV3eG5lbSIsImlhdCI6MTc0MTU5MjgzNn0.TDFaTLiBuVkOweLewDOpxT4DH0wxxZAPPQKDG_trfas");

    setRoomId("12121");

    newSocket.onopen = () => {
      setSocket(newSocket);
      newSocket.send('{"event": "join", "payload": {"roomId": "12121"}}');
    };

    if(!socket) {
      return;
    }
    socket.onmessage = (event) => {
      console.log(event.data);
    };
  })

  useEffect(() => {

    if(canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if(!ctx) return;
      ctx.fillStyle = "rgba(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      let endX: number;
      let endY: number;
      let startX: number;
      let startY: number;
      let clicked: boolean = false;
      let width: number;
      let height: number;

      canvas.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
        clicked = true;
      });
      
      canvas.addEventListener("mouseup", () => {
        clicked = false;
      })

      canvas.addEventListener("mousemove", (e) => {
        if(clicked && socket) {
          endX = e.clientX;
          endY = e.clientY;
          width = endX - startX;
          height = endY - startY;

          socket.send(JSON.stringify({
            event: "share",
            payload: {
              roomId,
              type: "rect",
              x: startX,
              y: startY,
              width,
              height
            }
          }))

          console.log({
            event: "share",
            payload: {
              roomId,
              type: "rect",
              x: startX,
              y: startY,
              width,
              height
            }
          });

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(0,0,0)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "rgba(255,255,255)"
          ctx.strokeRect(startX, startY, width, height);
        }
      })
    }
  
  }, [canvasRef, roomId, socket])

  if(!socket) return <div>Loading....</div>

  return (
    <canvas width={ 2000 } height={ 1000 } ref={ canvasRef }>
    </canvas>
  )
}

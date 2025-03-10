'use client'

import { useEffect, useRef } from "react"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const socket = new WebSocket("ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRoYUBnbWFpbC5jb20iLCJuYW1lIjoiRGhhbnVzaCIsImlkIjoiY204MnIxODhwMDAwMHhqNXQ0cDV3eG5lbSIsImlhdCI6MTc0MTU5MjgzNn0.TDFaTLiBuVkOweLewDOpxT4DH0wxxZAPPQKDG_trfas");

  socket.onopen = () => {
    socket.send('{"event": "join", "payload": {"roomId": "12121", "userId": "3145"}}');
  };

  socket.onmessage = (event) => {
    console.log("Message from server:", event.data);
  };

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
  
      canvas.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
        clicked = true;
      });
  
      canvas.addEventListener("mouseup", () => {
        clicked = false;
      })

      canvas.addEventListener("mousemove", (e) => {
        if(clicked) {
          endX = e.clientX;
          endY = e.clientY;
          const width = endX - startX;
          const height = endY - startY;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(0,0,0)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "rgba(255,255,255)"
          ctx.strokeRect(startX, startY, width, height);
        }
      })
    }
  
  }, [canvasRef])

  return (
    <canvas width={ 2000 } height={ 1000 } ref={ canvasRef }>
    </canvas>
  )
}

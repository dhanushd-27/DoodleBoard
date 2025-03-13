"use client"

import React, { useEffect, useRef, useState } from 'react'
import { mouseEventHandler } from '../utils/draw';

type Props = {
  roomId: string,
}

export default function Canvas({ roomId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRoYUBnbWFpbC5jb20iLCJuYW1lIjoiRGhhbnVzaCIsImlkIjoiY204MnIxODhwMDAwMHhqNXQ0cDV3eG5lbSIsImlhdCI6MTc0MTU5MjgzNn0.TDFaTLiBuVkOweLewDOpxT4DH0wxxZAPPQKDG_trfas");

    newSocket.onopen = () => {
      setSocket(newSocket);
      newSocket.send('{"event": "join", "payload": {"roomId": "12121"}}');
    };

    if(!socket) {
      return;
    }
    
  }, [socket])

  useEffect(() => {

    if(canvasRef.current && socket) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if(ctx) {
        mouseEventHandler(canvas, socket, ctx, roomId);
      }
    }
  
  }, [canvasRef, roomId, socket])

  if(!socket) return <div>Loading....</div>

  return (
    <div className="overflow-hidden">
      <canvas width={ 2000 } height={ 1000 } ref={ canvasRef } >
      </canvas>
    </div>
  )
}

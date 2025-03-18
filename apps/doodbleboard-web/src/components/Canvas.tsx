"use client"

import React, { useEffect, useRef, useState } from 'react'
import { mouseEventHandler } from '../utils/draw';
import { useAppSelector } from '../lib/hooks/reduxHooks';

type Props = {
  roomId: string,
  token: string
}

export default function Canvas({ roomId, token }: Props) {

  const shape = useAppSelector(state => state.selectedTool.value);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const leave = () => {
    if(!socket) return;
    socket.send(`{"event":"leave","payload":{"roomId": ${roomId}}}`)
  }

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8080?token=${token}`);

    newSocket.onopen = () => {
      setSocket(newSocket);
      newSocket.send(`{"event": "join", "payload": {"roomId": ${roomId}}}`);
    };

    // Handle WebSocket closing when component unmounts
    if(!socket) {
      newSocket.onclose = () => {
        console.log("WebSocket closed");
      };
  
      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      
      return () => {
        newSocket.send(`{"event":"leave","payload":{"roomId": ${roomId}}}`);
        newSocket.close(); // Cleanup WebSocket on unmount
      }
    }
  }, [token, roomId]);

  useEffect(() => {
    if (!canvasRef.current || !socket) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const { removeListeners } = mouseEventHandler(canvas, socket, ctx, roomId, shape);

      return () => {
        removeListeners();
      };
    }
  }, [socket, roomId, shape]);

  if (!socket || !token) return <div>Loading....</div>;

  return (
    <div className="overflow-hidden">
      <canvas width={2000} height={1000} ref={canvasRef}></canvas>
      <div className='fixed bottom-4 left-[85%] flex justify-between gap-4'>
        <button className='bg-white py-2 px-4 rounded-xl text-black' onClick={ leave }>Leave room</button>
      </div>
    </div>
  );
}
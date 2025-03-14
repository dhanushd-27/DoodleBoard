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

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8080?token=${token}`);

    newSocket.onopen = () => {
      setSocket(newSocket);
      newSocket.send('{"event": "join", "payload": {"roomId": "12121"}}');
    };

    // Handle WebSocket closing when component unmounts
    newSocket.onclose = () => {
      console.log("WebSocket closed");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      newSocket.close(); // Cleanup WebSocket on unmount
    };

  }, [token]);

  useEffect(() => {
    if (!canvasRef.current || !socket) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const { removeListeners }= mouseEventHandler(canvas, socket, ctx, roomId, shape);

      return () => {
        removeListeners(); // Remove event listeners when unmounting
      };
    }
  }, [socket, roomId, shape]);

  if (!socket) return <div>Loading....</div>;

  return (
    <div className="overflow-hidden">
      <canvas width={2000} height={1000} ref={canvasRef}></canvas>
    </div>
  );
}

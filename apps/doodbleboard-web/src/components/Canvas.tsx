"use client"

import React, { useEffect, useRef, useState } from 'react'
import { mouseEventHandler } from '../utils/draw';
import { useAppSelector } from '../lib/hooks/reduxHooks';
import { fetchShapes } from '@/actions/fetchShapes';

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
    socket.send(`{"event":"leave","payload":{"roomId": "${roomId}"}}`)
  }

useEffect(() => {
  const newSocket = new WebSocket(`ws://localhost:8080?token=${token}`);

  newSocket.onopen = () => {
    setSocket(newSocket);
    newSocket.send(JSON.stringify({ event: "join", payload: { roomId } }));
  };

  newSocket.onclose = () => {
    console.log("WebSocket closed");
  };
  // Cleanup function to send leave event and close WebSocket before unmounting
  return () => {
    if (newSocket.readyState === WebSocket.OPEN) {
      newSocket.send(JSON.stringify({ event: "leave", payload: { roomId } }));
    }
    newSocket.close();
  };

}, [token, roomId]); // Dependencies ensure it runs when token or roomId changes


  useEffect(() => {
    if (!canvasRef.current || !socket) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let removeListeners: () => void;

    const setupMouseEvents = async () => {
      if (ctx) {
      const exisitedShapes = await fetchShapes();

      removeListeners = await mouseEventHandler(canvas, socket, ctx, roomId, shape, "dhanush", exisitedShapes);
      }
    };

    setupMouseEvents()

    return () => {
      // If removeListeners has been defined, invoke it to remove event listeners
      if (removeListeners) {
        removeListeners();
      }
    };
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
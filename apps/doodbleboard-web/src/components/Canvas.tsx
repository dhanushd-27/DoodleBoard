"use client"

import React, { useEffect, useRef, useState } from 'react'
import { mouseEventHandler } from '../utils/draw';
import { useAppDispatch, useAppSelector } from '../lib/hooks/reduxHooks';
import { setRoomId } from '@/lib/store/roomId/roomIdSlice';

type Props = {
  roomId: string,
  token: string
}

export default function Canvas({ roomId, token }: Props) {

  const dispatch = useAppDispatch();
  const shape = useAppSelector(state => state.selectedTool.value);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  dispatch(setRoomId({ roomId: roomId }));

  const leave = () => {
    if(!socket) return;
    socket.send(`{"event":"leave","payload":{"roomId": "${roomId}"}}`)
  }

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8080?token=${token}`);

    newSocket.onopen = () => {
      setSocket(newSocket);
      console.log(`{"event": "join", "payload": {"roomId": "${roomId}"}}`)
      newSocket.send(`{"event": "join", "payload": {"roomId": "${roomId}"}}`);
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
        newSocket.send(`{"event":"leave","payload":{"roomId": "${roomId}"}}`);
        newSocket.close(); // Cleanup WebSocket on unmount
      }
    }
  }, [token, roomId]);

  useEffect(() => {
    if (!canvasRef.current || !socket) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const { removeListeners } = mouseEventHandler(canvas, socket, ctx, roomId, shape, "dhanush");

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
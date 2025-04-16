"use client"

import React, { useEffect, useRef } from 'react'
import { mouseEventHandler } from '@/utils/draw';
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { fetchShapes } from '@/actions/shapeActions/fetchShapes';
import { useRouter } from 'next/navigation';

type Props = {
  roomId: string,
  socket: WebSocket
}

export default function Canvas({ roomId, socket }: Props) {
  const shape = useAppSelector(state => state.selectedTool.value);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const leave = () => {
    if(!socket) return;
    socket.send(`{"event":"leave","payload":{"roomId": "${roomId}"}}`)
    router.push("/dashboard");
  }

  useEffect(() => {
    if (!canvasRef.current || !socket) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let removeListeners: () => void;

    const setupMouseEvents = async () => {
      if (ctx) {
        const exisitedShapes = await fetchShapes({ roomId });

        removeListeners = await mouseEventHandler(canvas, socket, ctx, roomId, shape, "dhanush", exisitedShapes);
      }
    };

    setupMouseEvents();
    
    return () => {
      if(removeListeners) {
        removeListeners();
      }
    };
  }, [socket, roomId, shape]);
  return (
    <>
      <canvas width={2000} height={1000} ref={canvasRef}></canvas>
      <div className='fixed bottom-4 left-[85%] flex justify-between gap-4'>
        <button className='bg-white py-2 px-4 rounded-xl text-black' onClick={ leave }>Leave room</button>
      </div>
    </>
  );
}
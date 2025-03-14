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
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8080?token=${token}`);

    newSocket.onopen = () => {
      setSocket(newSocket);
      newSocket.send('{"event": "join", "payload": {"roomId": "12121"}}');
    };

    if(!socket) {
      return;
    }
  })

  useEffect(() => {
    if(canvasRef.current && socket) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if(ctx) {
        mouseEventHandler(canvas, socket, ctx, roomId, shape);
      }
    }
  
  })

  if(!socket) return <div>Loading....</div>

  return (
    <div className="overflow-hidden">
      <canvas width={ 2000 } height={ 1000 } ref={ canvasRef } >
      </canvas>
    </div>
  )
}

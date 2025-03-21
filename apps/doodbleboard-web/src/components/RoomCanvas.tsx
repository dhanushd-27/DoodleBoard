"use client"
import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'

type Props = {
  roomId: string,
  token: string
}

export default function RoomCanvas({ roomId, token }: Props) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
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

  if(!socket || !token) return <p>Loading...</p>

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <Canvas roomId={ roomId } socket={ socket } />
    </div>
  )
}

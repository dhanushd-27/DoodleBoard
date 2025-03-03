'use client'
// import { WebSocket } from 'ws'
import React, { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState(["Hello there"]);
  const wsRef = useRef<
  WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data as string]);
    }

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "12121"
        }
      }));
    }

    wsRef.current = ws as WebSocket;
  })

  return (
    <div className='w-max flex flex-col h-max gap-6'>
      <div className='bg-white w-3xl h-96 rounded-2xl'>
        {
          messages.map((message, index) => (
            <div className='w-max h-max bg-black text-white rounded-sm ' key={ index }>
              { message }
            </div>
          ))
        }
      </div>
    
      <div className='flex gap-2'>
        <input id='message' type="text" placeholder='Enter Message' className='text-black py-2 bg-white rounded-xl'/>
        <button className='bg-purple-900 text-white py-2 px-6 rounded-sm' onClick={ () => {
            const message = document.getElementById("message")?.value;

            wsRef.current?.send(JSON.stringify({ type: 'chat', payload: {
              message: message
            }}))
        } }>Send Message</button>
      </div>
    </div>
  )
}

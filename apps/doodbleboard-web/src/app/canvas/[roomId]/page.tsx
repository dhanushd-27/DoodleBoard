import React from 'react'
import { cookies } from 'next/headers'
import RoomCanvas from '@/components/RoomCanvas';
import ToolsNavBar from '@/components/Nav/ToolsNavBar';

export default async function CanvasPage() {
  const cookieStore = await cookies();
  const tokenObject = cookieStore.get("token");

  if(!tokenObject) return;
  const token = tokenObject.value;

  const roomId = "cm8gxdde80001xjkjpygk6eyr";

  return (
    <div>
      <ToolsNavBar />
      <RoomCanvas roomId={ roomId } token={ token }/>
    </div>
  )
}

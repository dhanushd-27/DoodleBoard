import React from 'react'
import { cookies } from 'next/headers'
import RoomCanvas from '@/components/RoomCanvas';
import ToolsNavBar from '@/components/Nav/ToolsNavBar';
import { getRoomId } from '@/actions/roomActions/getRoomId';

export default async function CanvasPage({ params }: {
  params: Promise<{slug: string}>
}) {
  const slug = (await params).slug;

  const roomId = await getRoomId({ slug: slug });
  const cookieStore = await cookies();
  const tokenObject = cookieStore.get("token");

  if(!tokenObject) return;

  const token = tokenObject.value;
  return (
    <div>
      <ToolsNavBar />
      <RoomCanvas roomId={ roomId } token={ token }/>
    </div>
  )
}

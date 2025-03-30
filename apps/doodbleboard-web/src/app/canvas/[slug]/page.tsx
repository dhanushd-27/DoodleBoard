import React from 'react'
import RoomCanvas from '@/components/RoomCanvas';
import ToolsNavBar from '@/components/Nav/ToolsNavBar';
import { getRoomIdAndToken } from '@/actions/generalAction/getRoomIdAndToken';

export default async function CanvasPage({ params }: {
  params: Promise<{slug: string}>
}) {
  const slug = (await params).slug;

  const { roomId, token } = await getRoomIdAndToken({ slug })
  
  return (
    <div>
      <ToolsNavBar />
      <RoomCanvas roomId={ roomId } token={ token }/>
    </div>
  )
}
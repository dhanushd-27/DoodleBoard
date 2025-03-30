import { getRoomList } from '@/actions/roomActions/getRoomList'
import React from 'react'
import RoomCard from './RoomCard';

export default async function RoomsList() {

  const roomsList = await getRoomList();

  if(!roomsList) return <div>Yet to Join a Room</div>

  return (
    <div className='flex gap-6 flex-wrap justify-start p-6'>
      { roomsList.map( (room, index) => (
        <RoomCard key={ index } name={ room.name } roomSlug={ room.slug } />
      ))}
    </div>
  )
}

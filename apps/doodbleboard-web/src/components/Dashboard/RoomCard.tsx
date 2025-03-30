"use client"
// Fetch rooms code to be added

import { MouseEvent } from 'react';
import toast from 'react-hot-toast';
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

type RoomCard = {
  name: string,
  roomSlug: string
}

export default function RoomCard({ name, roomSlug }: RoomCard) {
  const router = useRouter();

  const handleJoinRoom = (e: MouseEvent) => {
    e.preventDefault();

    if (!roomSlug) {
      toast.error("Slug can't be empty");
      return;
    }

    // Navigate to the room using the slug
    router.push(`/canvas/${roomSlug}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>Room Name</CardDescription>
        <CardTitle>{ name }</CardTitle>
        {/* Make a copy button */}
        {/* Update slug based on input */}
        {/* Input disabled as the value will be passed as props */}
        <Input value={ roomSlug } disabled/>

        <Button onClick={ (e) => { handleJoinRoom(e) }}>Join Room</Button>
      </CardHeader>
    </Card>
  )
}

"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function JoinRoom() {
  const router = useRouter();

  const handleJoinRoom = () => {
    console.log("join room")
    router.push("/canvas/78263")
  }

  return (
    <Button className='gap-2' variant='secondary' onClick={handleJoinRoom}>
      Join Room
      <Plus className='size-4' />
    </Button>
  )
}

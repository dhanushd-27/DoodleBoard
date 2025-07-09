"use client"

import { Button } from '@/components/ui/button'
import { PencilLine } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CreateRoom() {
  const router = useRouter()

  const handleCreateRoom = () => {
    console.log('create room')
    router.push("/canvas/78263")
  }

  return (
    <Button variant='outline' className='gap-2' onClick={handleCreateRoom}>
      Create Room
      <PencilLine />
    </Button>
  )
}

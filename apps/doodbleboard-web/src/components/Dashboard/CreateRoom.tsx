"use client"

import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { createRoom } from '@/actions/roomActions/createSlug';
import toast from 'react-hot-toast'
import { Separator } from '../ui/separator'

export default function CreateRoom() {
  const [createdRoomSlug, setCreatedRoomSlug] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [copy, setCopy] = useState(false);

  const handleCreateRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(!roomName) {
      toast.error("Room Name Cannot be Empty");
      return;
    }

    const slug = await createRoom({ name: roomName });

    setCreatedRoomSlug(slug);
  }

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(createdRoomSlug);
    setCopy(true);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Room</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Create your own room and collaborate with friends by sharing the room slug to brainstorm ideas together.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' placeholder='Enter your room name' className='col-span-3' onChange={ (e) => setRoomName(e.target.value)} />
          </div>
        </div>
        <Separator />
        <div className='grid gap-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='slug' className='text-right'>
              Slug
            </Label>
            <Input id='slug' value={ createdRoomSlug } placeholder='Slug' disabled />
            <Button variant={ 'outline' } onClick={ (e) => handleCopy(e) }>
              { copy ? "Copied!" : "Copy" }
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={ (e) => handleCreateRoom(e) } >
            Create Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

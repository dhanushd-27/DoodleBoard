"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogDescription, DialogHeader, DialogTrigger,  DialogContent, DialogTitle, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast"


export default function JoinRoom() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');

  const handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!slug) {
      toast.error("Slug can't be empty");
      return;
    }

    // Navigate to the room using the slug
    router.push(`/canvas/${slug}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white text-black" >Join Room</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Room</DialogTitle>
          <DialogDescription>Join your friend&apos;s room easily with just a room slug.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder="Enter room slug" className="col-span-3" 
              onChange={ (e) => setSlug(e.target.value) }/>
            </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={ (e) => { 
              handleJoinRoom(e);
            } }>Join Room</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

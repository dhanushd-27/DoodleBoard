'use client'

import { useRouter } from 'next/navigation';
import React, { MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [slug, setSlug] = useState<string>('');
  const router = useRouter();

  async function handleJoinSubmit(e: MouseEvent) {
    e.preventDefault();

    if(!slug){
      toast.error("Toast can't be empty");
      return;
    }
    
    router.push(`/canvas/${slug}`);
  }

  return (
    <section className='bg-[#205781] min-h-screen'>
      <header className='py-4 px-5'>
        <nav className='flex gap-4'>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
              placeholder="Enter room slug" 
              className='p-2 rounded-xl'
            />
            <button 
              className='bg-white px-4 py-2 rounded-xl' 
              type='submit'
              onClick={(e) => { handleJoinSubmit(e) }}
            >
              Join a room
            </button>
          <button className='bg-black text-white px-4 py-2 rounded-xl'>Create Room</button>
        </nav>
      </header>
    </section>
  );
}

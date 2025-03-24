'use client'

import { getRoomId } from '@/actions/roomActions/getRoomId';
import React, { useEffect } from 'react'

export default function Dashboard() {

  useEffect(() => {
    async function runAsync() {
      console.log(await getRoomId({ slug: "gwNs9Dj"}));
    }

    runAsync();
  }, []);

  return (
    <section className='bg-[#205781] min-h-screen'>
      <header className='py-4 px-5'>
        <nav className='flex gap-4'>
          <button className='bg-white px-4 py-2 rounded-xl'>Join a room</button>
          <button className='bg-black text-white px-4 py-2 rounded-xl'>Create Room</button>
        </nav>
      </header>
    </section>
  )
}

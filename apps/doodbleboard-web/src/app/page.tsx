import { Button } from '@/components/ui/button'
import { Github, Pen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function LandingPage() {
  return (
    <div className='flex flex-col justify-center items-center h-[100svh] w-full'>
      <header className='w-full justify-between flex fixed top-0 px-8 py-6'>
        <div className='flex gap-4 items-center'>
          <div className='border rounded-lg border-solid p-2 border-black'>
            <Pen />
          </div>
          <h5 className='font-semibold text-xl '>Doodleboard</h5>
        </div>
        <div className='flex gap-6 justify-center'>
          <Link href={"https://github.com/dhanushd-27"} target='_blank' >
            <Github />
          </Link>
          <Link href={"https://x.com/orca_x27"} target='_blank'>
            <Image src={'/twitter.png'} alt='twitter image' width={20} height={20} />
          </Link>
        </div>
      </header>

      <div className='items-center px-16 flex flex-col gap-4 text-center w-[700px] relative'>
        <h1 className='text-8xl font-bold '>DoodleBoard</h1>
        <h2 className='text-xl font-semibold text-black/60'>DoodleBoard is an easy-to-use web app that lets you create rooms to brainstorm, draw, and share ideas with others. Collaborate in a fun and simple way, whether you&apos;re working alone or with a team!</h2>
        
        <div className='flex gap-4'>
          <Button variant={ "outline" } asChild>
            <Link href="/login" className="py-2 px-4">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

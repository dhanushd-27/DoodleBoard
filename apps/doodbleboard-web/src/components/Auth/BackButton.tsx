import React from 'react'
import Image from 'next/image'

export default function BackButton() {
  return (
    <button className='absolute top-7 left-7 bg-black/20 border border-primary/40 rounded-md py-2 px-4 text-sm flex items-center justify-center gap-2'>
      <Image src={'/back.png'} height={10} width={10} alt='back' className='invert inline'/> Back  
    </button>
  )
}

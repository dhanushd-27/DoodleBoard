'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Leave() {
  const router = useRouter()

  return (
    <div 
      className={`p-3 rounded-xl hover:bg-muted/20 hover:cursor-pointer`}
      onClick={() => {
        console.log("exit")
        router.push('/dashboard')
      }}
    >
      <Image src='/leave.svg' alt='leave' height={17} width={17} />
    </div>
  )
}

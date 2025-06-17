import Image from 'next/image'
import React from 'react'

export default function Home() {
  return (
    <Image src={'/logo.png'} alt='logo' height={80} width={80}/>
  )
}
import Image from 'next/image'
import React from 'react'


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className=''>
      <div className='flex gap-2 items-center justify-start'>
        <Image src={'/logo.png'} alt='app-logo' height={40} width={90}/>
      </div>
      {children}
    </section>
  )
}
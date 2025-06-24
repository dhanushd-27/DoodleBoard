import Image from 'next/image'
import React from 'react'


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-base h-screen px-17 py-8 relative -z-10 overflow-hidden noise">
      {/* logo div is below*/}
      <div className='flex gap-2 items-center justify-start'>
        <Image src={'/logo.png'} alt='app-logo' height={40} width={90}/>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center flex-1 text-[var(--color-text-base)] overflow-auto">
        <div className='absolute top-0 left-0 w-40 h-40 bg-primary backdrop-blur-sm rounded-full -z-10 blur-[300px] '></div>
        {children}
      </div>
    </section>
  )
}
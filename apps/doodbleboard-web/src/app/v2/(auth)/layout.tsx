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
      <div className="flex flex-col gap-4 items-center justify-center flex-1 text-[var(--color-text-base)]">
        <div className='absolute -bottom-90 -left-90 w-40 h-200 rotate-45 bg-primary rounded-full -z-10 blur-[200px] '></div>
        {/* <div className='absolute -top-90 right-0 w-100 h-100 bg-subtle rounded-full -z-10 blur-[600px] '></div> */}
        <div className='absolute  w-7/12 h-11/12 -bottom-70 -right-70 rounded-full -z-10 bg-linear-to-tl from-primary/40 from-10% via-subtle/40 via-30% to-base to-80% blur-[200px]'></div>
        {children}
      </div>
    </section>
  )
}
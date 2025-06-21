import Image from 'next/image'
import React from 'react'


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="h-full w-full flex flex-col flex-1 overflow-hidden">
      {/* logo div is below*/}
      <div className='flex gap-2 items-center justify-start'>
        <Image src={'/logo.png'} alt='app-logo' height={40} width={90}/>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center flex-1 text-[var(--color-text-base)] max-w-full overflow-auto">
        {children}
      </div>
    </section>
  )
}
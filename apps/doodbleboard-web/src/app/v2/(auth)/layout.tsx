import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-base h-screen px-17 py-8 relative overflow-hidden">
      {/* logo div is below*/}
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
        <div className='absolute -bottom-10 -left-20 w-120 h-120 bg-linear-to-tr from-primary/90 from-10% via-subtle/70 via-30% to-base to-80% rounded-full blur-3xl'></div>
        {/* <div className='absolute -top-90 right-0 w-100 h-100 bg-subtle rounded-full -z-10 blur-[600px] '></div> */}
        <div className='absolute w-120 h-120 -top-10 -right-20 rounded-full bg-linear-to-bl from-primary/90 from-10% via-subtle/70 via-30% to-base to-80% blur-3xl'></div>
        {children}
      </div>
    </section>
  )
}
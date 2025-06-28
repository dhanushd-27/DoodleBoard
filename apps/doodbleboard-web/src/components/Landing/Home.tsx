import React from 'react'

export default function Home() {
  return (
    <section className='h-screen relative'>
      <div className='absolute bottom-20 -left-120 h-100 w-100 rotate-45 bg-primary blur-[100px]'></div>
      <div className='absolute -bottom-20 -right-20 h-150 w-150 rotate-45 bg-primary blur-[400px]'></div>
    </section>
  )
}

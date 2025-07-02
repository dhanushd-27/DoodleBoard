'use client'

export default function Canvas() {

  return (
    <section className='w-screen h-screen overflow-hidden'>
      <canvas className='bg-base noise' width={2000} height={1000} ></canvas>
    </section>
  )
}


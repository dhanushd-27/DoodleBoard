import React from 'react'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className='bg-base h-screen px-17 py-8 relative -z-10 overflow-hidden'>
      <div className='absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-base-50)] blur-[200px] -z-10 opacity-75 animate-pulse'></div>
      <div className='absolute top-1/4 -left-1/3 w-[500px] h-[500px] rounded-full bg-[var(--color-base-100)] blur-[150px] -z-10 opacity-65 animate-pulse'></div>
      <div className='absolute -top-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-[var(--color-base-200)] blur-[190px] -z-10 opacity-80 animate-pulse'></div>
      <div className='absolute top-1/2 right-1/4 w-[550px] h-[550px] rounded-full bg-[var(--color-base-300)] blur-[200px] -z-10 opacity-70 animate-pulse'></div>
      <div className='absolute -top-1/3 -right-1/4 w-[650px] h-[650px] rounded-full bg-[var(--color-base-400)] blur-[200px] -z-10 opacity-75 animate-pulse'></div>
      <div className='absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-base-500)] blur-[150px] -z-10 opacity-65 animate-pulse'></div>
      
      <div className='absolute top-1/6 left-1/6 w-[450px] h-[450px] rounded-full bg-[#2a2d2f] blur-[180px] -z-10 opacity-70 animate-pulse'></div>
      <div className='absolute bottom-1/6 right-1/6 w-[750px] h-[750px] rounded-full bg-[#3a3f42] blur-[220px] -z-10 opacity-60 animate-pulse'></div>
      <div className='absolute top-3/4 left-1/2 w-[400px] h-[400px] rounded-full bg-[#2f3336] blur-[160px] -z-10 opacity-75 animate-pulse'></div>
      
      <div className='absolute bottom-1/3 left-1/4 w-[650px] h-[650px] rounded-full bg-[#2e3134] blur-[240px] -z-10 opacity-65 animate-pulse'></div>
      <div className='absolute top-1/3 right-1/3 w-[550px] h-[550px] rounded-full bg-[#323639] blur-[170px] -z-10 opacity-70 animate-pulse'></div>
      <div className='absolute -top-1/6 left-1/4 w-[800px] h-[800px] rounded-full bg-[#2c2f32] blur-[260px] -z-10 opacity-55 animate-pulse'></div>
      
      <div className='absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-[#4a4f53] blur-[140px] -z-10 opacity-80 animate-pulse'></div>
      <div className='absolute top-1/2 left-1/8 w-[700px] h-[700px] rounded-full bg-[#5c6368] blur-[200px] -z-10 opacity-60 animate-pulse'></div>
      <div className='absolute top-1/8 right-1/6 w-[600px] h-[600px] rounded-full bg-[#3d4246] blur-[190px] -z-10 opacity-70 animate-pulse'></div>
      { children }
    </section>
  )
}

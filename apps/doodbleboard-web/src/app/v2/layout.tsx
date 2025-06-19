import React from 'react'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className='bg-v2-background h-screen px-17 py-8'>
      { children } 
    </section>
  )
}

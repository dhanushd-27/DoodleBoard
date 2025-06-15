import React from 'react'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className='bg-v2-background h-screen px-20 py-5'>
      { children }
    </section>
  )
}

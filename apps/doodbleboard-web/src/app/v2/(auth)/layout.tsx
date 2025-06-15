import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className='bg-v2-background'>{children}</section>
}
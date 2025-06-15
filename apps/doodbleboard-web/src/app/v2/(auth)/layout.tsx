import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className='flex h-screen items-center justify-center text-v2-primary'>{children}</section>
}
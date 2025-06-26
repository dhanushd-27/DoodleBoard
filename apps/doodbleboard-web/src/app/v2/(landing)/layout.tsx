import React from "react"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-base h-screen px-17 py-8 relative overflow-hidden">
      {children}
    </section>
  )
}
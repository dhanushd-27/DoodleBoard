'use client'
import { useRef } from "react"

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <section className='w-screen h-screen overflow-hidden'>
      <canvas className='bg-base noise' width={2000} height={1000} ref={canvasRef} ></canvas>
    </section>
  )
}


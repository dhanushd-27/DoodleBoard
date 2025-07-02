'use client'

import { useEffect, useRef } from 'react'

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = 'red'
  }, [])
  return (
    <>
      <canvas className='w-screen h-screen bg-base noise' ></canvas>
    </>
  )
}

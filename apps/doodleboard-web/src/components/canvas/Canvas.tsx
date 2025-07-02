'use client'
import { useEffect, useRef } from "react"
import { useMouseMove } from "@/app/hooks/useMouseMove"
import { useMouseDown } from "@/app/hooks/useMouseDown"
import { useMouseUp } from "@/app/hooks/useMouseUp"

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { handleMouseMove } = useMouseMove()
  const { handleMouseDown } = useMouseDown()
  const { handleMouseUp } = useMouseUp()

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  })

  return (
    <section className='w-screen h-screen overflow-hidden'>
      <canvas className='bg-base noise' width={2000} height={1000} ref={canvasRef} ></canvas>
    </section>
  )
}


'use client'

import { useEffect, useRef } from "react"
import { useMouseMove } from "@/app/hooks/useMouseMove"
import { useMouseDown } from "@/app/hooks/useMouseDown"
import { useMouseUp } from "@/app/hooks/useMouseUp"
import { getCanvas, setCanvas } from "@/utils/canvas/canvas-ctx/canvas-ctx-manager"

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { handleMouseMove } = useMouseMove()
  const { handleMouseDown } = useMouseDown()
  const { handleMouseUp } = useMouseUp()

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current)
    }

    const getCanvasRef = getCanvas();

    if (getCanvasRef) {
      getCanvasRef.addEventListener('mousedown', handleMouseDown)
      getCanvasRef.addEventListener('mouseup', handleMouseUp)
      getCanvasRef.addEventListener('mousemove', handleMouseMove)
    }
    console.log(10)

    return () => {
      if (getCanvasRef) {
        getCanvasRef.removeEventListener('mousedown', handleMouseDown)
        getCanvasRef.removeEventListener('mouseup', handleMouseUp)
        getCanvasRef.removeEventListener('mousemove', handleMouseMove)
      }
    }
  })

  return (

    <section className='w-screen h-screen overflow-hidden relative z-10'>
      <canvas className='bg-base noise' width={2000} height={1000} ref={canvasRef} ></canvas>
    </section>
  )
}


'use client'

import { useMouseDown } from '@/app/hooks/useMouseDown'
import { useMouseUp } from '@/app/hooks/useMouseUp'
import { RootState } from '@/utils/store/store'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseDown = useSelector((state: RootState) => state.mouseDown)
  const mouseUp = useSelector((state: RootState) => state.mouseUp)
  const { handleMouseDown } = useMouseDown()
  const { handleMouseUp } = useMouseUp()

  useEffect(() => {
    document.addEventListener('mousedown', (e) => handleMouseDown(e))
    document.addEventListener('mouseup', (e) => handleMouseUp(e))

    return () => {
      document.removeEventListener('mousedown', (e) => handleMouseDown(e))
      document.removeEventListener('mouseup', (e) => handleMouseUp(e))
    }
  })

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'white'
    ctx.strokeRect(mouseDown.x, mouseDown.y, mouseUp.x - mouseDown.x, mouseUp.y - mouseDown.y)
  }, [mouseDown, mouseUp])

  return (
    <section className='w-screen h-screen overflow-hidden'>
      <canvas className='bg-base noise' ref={canvasRef}  width={2000} height={1000} ></canvas>
    </section>
  )
}


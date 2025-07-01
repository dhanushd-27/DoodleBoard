'use client'

import { mouseDownHandler, mouseUpHandler } from '@/utils/canvas/mouse-handler'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('mousedown', (e) => mouseDownHandler(e,))
    document.addEventListener('mouseup', (e) => mouseUpHandler(e))



    return () => {
      document.removeEventListener('mousedown', mouseDownHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }
  })

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return
  })

  return (
    <>
      <canvas className='w-screen h-screen bg-base noise' ref={canvasRef}></canvas>
    </>
  )
}

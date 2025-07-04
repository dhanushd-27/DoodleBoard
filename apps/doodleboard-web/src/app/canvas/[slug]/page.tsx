import React from 'react'
import Canvas from '@/components/canvas/Canvas'
import ShapesNavbar from '@/components/canvas/tools/ShapesNavbar'

export default function CanvasSection() {
  return (
    <div className='relative'>
      <ShapesNavbar />
      <Canvas />  
    </div>
  )
}

import React from 'react'
import Canvas from '@/components/canvas/Canvas'
import ShapesNavbar from '@/components/canvas/tools/ShapesNavbar'
import Share from '@/components/canvas/buttons/Share'

export default function CanvasSection() {
  return (
    <div className='relative'>
      <ShapesNavbar />
      <Canvas />  
      <Share />
    </div>
  )
}

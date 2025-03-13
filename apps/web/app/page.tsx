import React, { useState } from 'react'
import Canvas from '../components/Canvas'
import { Circle, Pen, RectangleHorizontal } from 'lucide-react'
import ButtonIcon from '../components/Nav/ButtonIcon'

export default function CanvasPage() {

  return (
    <div>
      <div className='bg-gray-900 flex gap-4 z-30 fixed top-2 left-[40%] text-center text-white p-5 rounded-xl items-center justify-between'>
        <ButtonIcon >
          <Circle />
        </ButtonIcon>
        <ButtonIcon>
          <RectangleHorizontal />
        </ButtonIcon>
        <ButtonIcon>
          <Pen />
        </ButtonIcon>
      </div>
      <Canvas roomId='12121' />
    </div>
  )
}

import React from 'react'
import Canvas from '../../../components/Canvas'
import { Circle, Minus, Pen, RectangleHorizontal, Type } from 'lucide-react'
import ButtonIcon from '../../../components/Nav/ButtonIcon'

export default async function CanvasPage() {

  return (
    <div>
      <div className='bg-gray-900 flex gap-4 z-30 fixed top-2 left-[40%] text-center text-white p-5 rounded-xl items-center justify-between'>
        <ButtonIcon tool='circle'>
          <Circle />
        </ButtonIcon>
        <ButtonIcon tool='rect'>
          <RectangleHorizontal />
        </ButtonIcon>
        <ButtonIcon tool="text">
          <Type />
        </ButtonIcon>
        <ButtonIcon tool="line">
          <Minus />
        </ButtonIcon>
      </div>
      <Canvas roomId='12121' token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRoYUBnbWFpbC5jb20iLCJuYW1lIjoiRGhhbnVzaCIsImlkIjoiY204MnIxODhwMDAwMHhqNXQ0cDV3eG5lbSIsImlhdCI6MTc0MTU5MjgzNn0.TDFaTLiBuVkOweLewDOpxT4DH0wxxZAPPQKDG_trfas'/>
    </div>
  )
}

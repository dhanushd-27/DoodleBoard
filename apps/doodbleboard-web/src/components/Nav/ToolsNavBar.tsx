import React from 'react'
import ButtonIcon from './ButtonIcon'
import { Circle, Minus, MousePointer2, RectangleHorizontal, Type } from 'lucide-react'

export default function ToolsNavBar() {
  return (
    <div className='bg-gray-900 flex gap-4 z-30 fixed top-2 left-[40%] text-center text-white p-5 rounded-xl items-center justify-between'>
      <ButtonIcon tool='cursor'>
        <MousePointer2/>
      </ButtonIcon>
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
  )
}

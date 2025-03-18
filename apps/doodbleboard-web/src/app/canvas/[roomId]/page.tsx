import React from 'react'
import { Circle, Minus, RectangleHorizontal, Type } from 'lucide-react'
import ButtonIcon from '@/components/Nav/ButtonIcon'
import Canvas from '@/components/Canvas'
import { cookies } from 'next/headers'

export default async function CanvasPage() {
  const cookieStore = await cookies();
  const tokenObject = cookieStore.get("token");

  if(!tokenObject) return;
  const token = tokenObject.value;
  
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
      <Canvas roomId='cm8bwz1zy0001xj3q8e9px2jl' token={ token }/>
    </div>
  )
}

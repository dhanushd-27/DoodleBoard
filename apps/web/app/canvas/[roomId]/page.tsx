import React from 'react'
import Canvas from '../../../components/Canvas'
import { Circle, Minus, RectangleHorizontal, Type } from 'lucide-react'
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
      <Canvas roomId='12121' token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRoYW51c2hAZ21haWwuY29tIiwibmFtZSI6ImRoYW51c2giLCJpZCI6ImNtOGJobWplZzAwMDB4amRmb3R0MDdlenAiLCJpYXQiOjE3NDIxMjA2NjJ9.l5gYAEoeO882Fb5aue6-siMaCnVYTi_fQ-lQ1Eu1KEo'/>
    </div>
  )
}

'use client'

import React from 'react'
import { setShapeType, ShapeType } from '@/store/shape/shapeSlice'
import { RootState, useAppSelector, useAppDispatch } from '@/store/store'
import ShapeButton from './ShapeButton'

export default function ShapesNavbar() {
  const selectedShape = useAppSelector((state: RootState) => state.shape.type)
  const dispatch = useAppDispatch()

  const handleShapeClick = (shape: ShapeType) => {
    dispatch(setShapeType(shape))
  }

  return (
    <nav className='absolute top-2 left-180 bg-secondary backdrop-blur-sm border-b border-white/10 flex items-center justify-center gap-2 p-1 rounded-xl'>
      <div className='flex items-center justify-center'>
        <ul className='flex items-center justify-center gap-1'>
          {[
            {
              shape: ShapeType.POINTER,
              icon: '/shapes/mouse-pointer.svg',
              iconFilled: '/shapes/mouse-pointer-fill.svg',
              alt: 'mouse pointer',
              width: 17,
              height: 17,
            },
            {
              shape: ShapeType.SQUARE,
              icon: '/shapes/square.svg',
              iconFilled: '/shapes/square-fill.svg',
              alt: 'square',
              width: 16,
              height: 16,
            },
            {
              shape: ShapeType.CIRCLE,
              icon: '/shapes/circle.svg',
              iconFilled: '/shapes/circle-fill.svg',
              alt: 'circle',
              width: 16,
              height: 16,
            },
            {
              shape: ShapeType.RHOMBUS,
              icon: '/shapes/rhombus.svg',
              iconFilled: '/shapes/rhombus-fill.svg',
              alt: 'rhombus',
              width: 16,
              height: 16,
            },
            {
              shape: ShapeType.ARROW,
              icon: '/shapes/arrow-right.svg',
              iconFilled: '/shapes/arrow-right.svg',
              alt: 'arrow',
              width: 16,
              height: 16,
            },
            {
              shape: ShapeType.LINE,
              icon: '/shapes/line.svg',
              iconFilled: '/shapes/line.svg',
              alt: 'line',
              width: 16,
              height: 16,
            },
            {
              shape: ShapeType.PENCIL,
              icon: '/shapes/pencil.svg',
              iconFilled: '/shapes/pencil.svg',
              alt: 'pencil',
              width: 16,
              height: 16,
            },
            {
              shape: ShapeType.TEXT,
              icon: '/shapes/text.svg',
              iconFilled: '/shapes/text.svg',
              alt: 'text',
              width: 16,
              height: 16,
            }
          ].map((item) => (
            <ShapeButton
              key={item.shape}
              shape={item.shape}
              selected={selectedShape === item.shape}
              icon={item.icon}
              iconFilled={item.iconFilled}
              alt={item.alt}
              width={item.width}
              height={item.height}
              onClick={handleShapeClick}
            />
          ))}
        </ul>
      </div>
    </nav>
  )
}

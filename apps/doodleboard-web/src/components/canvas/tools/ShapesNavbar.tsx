'use client'

import React from 'react'
import Image from 'next/image'
import { setShapeType, ShapeType } from '@/store/shape/shapeSlice'
import { RootState, useAppSelector, useAppDispatch } from '@/store/store'

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
          <li
            onClick={() => handleShapeClick(ShapeType.POINTER)}
            className={`p-3 rounded-xl ${selectedShape === ShapeType.POINTER ? 'bg-subtle/80' : 'hover:bg-muted/20'}`}
          >
            {selectedShape === ShapeType.POINTER ? (
              <Image src='/shapes/mouse-pointer-fill.svg' alt='mouse pointer' width={17} height={17}/>
            ) : (
              <Image src={'/shapes/mouse-pointer.svg'} alt='mouse pointer' width={17} height={17} />
            )}
          </li>
          <li
            onClick={() => handleShapeClick(ShapeType.SQUARE)}
            className={`p-3 rounded-xl ${selectedShape === ShapeType.SQUARE ? 'bg-subtle/80' : 'hover:bg-muted/20'}`}
          >
            {selectedShape === ShapeType.SQUARE ? (
              <Image src={'/shapes/square-fill.svg'} alt='square' width={16} height={16} />
            ) : (
              <Image src={'/shapes/square.svg'} alt='square' width={16} height={16} />
            )}
          </li>
          <li
            onClick={() => handleShapeClick(ShapeType.CIRCLE)}
            className={`p-3 rounded-xl ${selectedShape === ShapeType.CIRCLE ? 'bg-subtle/80' : 'hover:bg-muted/20'}`}
          >
            {selectedShape === ShapeType.CIRCLE ? (
              <Image src={'/shapes/circle-fill.svg'} alt='circle' width={16} height={16} />
            ) : (
              <Image src={'/shapes/circle.svg'} alt='circle' width={16} height={16} />
            )}
          </li>
          <li
            onClick={() => handleShapeClick(ShapeType.RHOMBUS)}
            className={`p-3 rounded-xl ${selectedShape === ShapeType.RHOMBUS ? 'bg-subtle/80' : 'hover:bg-muted/20'}`}
          >
            {selectedShape === ShapeType.RHOMBUS ? (
              <Image src={'/shapes/rhombus-fill.svg'} alt='rhombus' width={16} height={16} />
            ) : (
              <Image src={'/shapes/rhombus.svg'} alt='rhombus' width={16} height={16} />
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ButtonIcon({ children }: Props) {
  return (
    <div className='w-10 h-10 rounded-lg border border-white flex items-center justify-center hover:bg-gray-600 hover:cursor-pointer '>
        { children }
    </div>
  )
}

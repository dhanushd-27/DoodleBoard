'use client'

import React, { ReactNode } from 'react'
import { setSelectedTool } from '../../lib/store/selectedTool/selectedToolSlice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/reduxHooks';

interface Props {
  children: ReactNode,
  tool: string
}

export default function ButtonIcon({ children, tool }: Props) {
  const dispatch = useAppDispatch();
  const toolSelected = useAppSelector(state => state.selectedTool.value)
  
  return (
    <button className={`w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-gray-600 hover:cursor-pointer ${ toolSelected === tool ? 'border-violet-600' : 'border-white' }`} onClick={ () => {
      dispatch(setSelectedTool({tool}));
    }}>
        { children }
    </button>
  )
}

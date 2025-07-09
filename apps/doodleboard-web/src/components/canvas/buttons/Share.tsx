"use client"

import { Button } from '@/components/ui/button'
import { ShareIcon } from 'lucide-react'
import React from 'react'

export default function Share() {
  const handleShare = () => {
    console.log('share')
  }

  return (
    <Button variant='secondary' className='absolute top-5 right-7 gap-2 z-10 px-2 dark' onClick={handleShare}>
      {/* Use a dialog box */}
      Share
      <ShareIcon />
    </Button>
  )
}

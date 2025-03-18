import Link from 'next/link'
import React from 'react'

interface Props {
  to: string,
  name: string
}

export default function PrimaryButton({ to, name }: Props) {
  return (
    <Link href={ to } className='bg-white rounded-xl text-black px-6 py-2'>
      { name }
    </Link>
  )
}

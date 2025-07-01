import React from 'react'

export default function Gradients() {
  return (
    <>
      <div className='absolute -bottom-10 -left-50 w-120 h-120 bg-linear-to-tr rotate-10 from-primary/90 from-10% via-subtle/70 via-30% to-base to-80% blur-3xl'></div>
      <div className='absolute w-200 h-200 -bottom-70 -right-40 bg-linear-to-tl rounded-full from-primary from-10% via-subtle via-50% to-base to-90% blur-[200px]'></div>
    </>
  )
}

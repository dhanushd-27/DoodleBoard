'use client'

import React from 'react'
import { useForm } from 'react-hook-form';
import { loginSchema, logIn } from '@repo/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<logIn>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit: (values: logIn) => void = (values) => {
    if (values) {
      console.log(values);
    } else {
      console.log("hello");
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-[var(--color-v2-primary)] rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <label htmlFor='email' className='text-sm font-medium text-[var(--color-v2-background)]'>Email</label>
        <input 
          type='email'
          className='w-full p-2 border rounded-md bg-[var(--color-v2-background)] text-[var(--color-v2-primary)] placeholder:text-[var(--color-v2-primary)] border-[var(--color-v2-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-v2-secondary)]'
          placeholder='Enter your email'
          {...register('email', { required: true })}
        />
        {errors.email && <p className='text-red-500 text-sm'>Email is required</p>}
        
        <label htmlFor='password' className='text-sm font-medium text-[var(--color-v2-background)]'>Password</label>
        <input 
          type='password'
          className='w-full p-2 border rounded-md bg-[var(--color-v2-background)] text-[var(--color-v2-primary)] placeholder:text-[var(--color-v2-primary)] border-[var(--color-v2-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-v2-secondary)]'
          placeholder='Enter your password'
          {...register('password', { required: true })} 
        />
        {errors.password && <p className='text-red-500 text-sm'>Password is required</p>}
        
        <button 
          type='submit'
          className='w-full p-2 bg-[var(--color-v2-secondary)] text-[var(--color-v2-primary)] rounded-md hover:bg-opacity-90 transition-colors duration-200'
        >
          Login
        </button>
      </form>
    </div>
  )
}
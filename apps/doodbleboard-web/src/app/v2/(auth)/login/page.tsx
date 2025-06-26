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
    <div className="w-full max-w-md py-8 px-10 flex flex-col gap-6 items-center justify-center text-primary rounded-4xl shadow-lg shadow-subtle/50 bg-transparent backdrop-blur-sm backdrop-saturate-100 bg-clip-border mt-32 border border-white/20">
      <div className='flex flex-col gap-2 items-center justify-center w-full text-center px-2'>
        <h4 className='font-semibold text-xl'>Sign in with email</h4>
        <p className='text-primary/70 text-sm'>Online whiteboard helps you to get your idea out there,
        co-create solutions and show it to others.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <input 
          type='email'
          className='w-full p-2 border rounded-md bg-[var(--color-base)]'
          placeholder='Email'
          {...register('email', { required: true })}
        />
        {errors.email && <p className='text-red-500 text-sm'>Email is required</p>}
        
        <input 
          type='password'
          className='w-full p-2 border rounded-md bg-[var(--color-base)]'
          placeholder='Password'
          {...register('password', { required: true })} 
        />
        {errors.password && <p className='text-red-500 text-sm'>Password is required</p>}
        
        <button 
          type='submit'
          className='w-full p-2 bg-[var(--color-text-strong)] text-[var(--color-text-base)] rounded-md hover:bg-opacity-90 transition-colors duration-200'
        >
          Login
        </button>
      </form>
    </div>
  )
}
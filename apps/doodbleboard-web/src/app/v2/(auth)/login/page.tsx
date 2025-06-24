'use client'

import React from 'react'
import { useForm } from 'react-hook-form';
import { loginSchema, logIn } from '@repo/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

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
    <div className="w-full max-w-md py-8 px-10 flex flex-col gap-4 items-center justify-center text-primary ">
      <div className='flex items-center justify-center rounded-xl'>
        <Image src={'/login.png'} alt='app-logo' height={30} width={30} className="invert"/>
      </div>

      <h4 className=''>Log in with Email</h4>
      <p className=''>Welcome Back!</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <label htmlFor='email' className='text-sm font-medium'>Email</label>
        <input 
          type='email'
          className='w-full p-2 border rounded-md bg-[var(--color-base)]'
          placeholder='Enter your email'
          {...register('email', { required: true })}
        />
        {errors.email && <p className='text-red-500 text-sm'>Email is required</p>}
        
        <label htmlFor='password' className='text-sm font-medium'>Password</label>
        <input 
          type='password'
          className='w-full p-2 border rounded-md bg-[var(--color-base)]'
          placeholder='Enter your password'
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
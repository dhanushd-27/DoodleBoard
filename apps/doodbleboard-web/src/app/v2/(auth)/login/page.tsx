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
    <div className="w-full max-w-md py-8 px-10 bg-[var(--color-text-base)] rounded-4xl flex flex-col gap-4 items-center justify-center border-2 border-text-light shadow-lg shadow-text-strong/30">
      <div className='flex items-center justify-center rounded-xl shadow-md p-3 shadow-base/50'>
        <Image src={'/login.png'} alt='app-logo' height={30} width={30}/>
      </div>

      <h4 className='text-base'>Log in with Email</h4>
      <p className='text-base'>Welcome Back!</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <label htmlFor='email' className='text-sm font-medium text-[var(--color-base)]'>Email</label>
        <input 
          type='email'
          className='w-full p-2 border rounded-md bg-[var(--color-base)] text-[var(--color-text-base)] placeholder:text-[var(--color-text-base)] border-[var(--color-text-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-strong)]'
          placeholder='Enter your email'
          {...register('email', { required: true })}
        />
        {errors.email && <p className='text-red-500 text-sm'>Email is required</p>}
        
        <label htmlFor='password' className='text-sm font-medium text-[var(--color-base)]'>Password</label>
        <input 
          type='password'
          className='w-full p-2 border rounded-md bg-[var(--color-base)] text-[var(--color-text-base)] placeholder:text-[var(--color-text-base)] border-[var(--color-text-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-strong)]'
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
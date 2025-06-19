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


  const onSubmit = (values: logIn) => {
    if (values) {
      console.log(values);
    } else {
      console.log("hello");
    }
  };

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-full'>
      {/* Signup signin form container */}
      <div className='w-full max-w-md p-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
          <label htmlFor='email' className='text-sm font-medium'>Email</label>
          <input 
            type='email'
            className='w-full p-2 border rounded-md' 
            {...register('email', { required: true })}
          />
          {errors.email && <p className='text-red-500 text-sm'>Email is required</p>}
          
          <label htmlFor='password' className='text-sm font-medium'>Password</label>
          <input 
            type='password'
            className='w-full p-2 border rounded-md'
            {...register('password', { required: true })} 
          />
          {errors.password && <p className='text-red-500 text-sm'>Password is required</p>}
          
          <button 
            type='submit'
            className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
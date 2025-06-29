'use client'

import React from 'react'
import { useForm } from 'react-hook-form';
import { signUpSchema, signUp } from '@repo/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import BackButton from '@/components/auth/BackButton';
import { signUpFunc } from '@/actions/authActions/signup';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

export default function Signup() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUp>({
    resolver: zodResolver(signUpSchema),
  });


  const onSubmit: (values: signUp) => void = async (values) => {
    const response: number | undefined = await signUpFunc(values);
    if(response === 201) {
      toast.success("Signup Successfull");
      router.push('/dashboard');
    } else {
      toast.error("Signup Failed!");
    }
  };

  return (
    <div className="mx-auto my-auto w-1/4 flex-1 flex flex-col gap-12 items-center justify-center text-primary">
      <BackButton/>
      <div className='flex gap-2 items-center justify-start'>
        <Image src={'/logo.png'} alt='app-logo' height={40} width={90}/>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center w-full text-center px-4'>
        <h4 className='font-medium text-3xl'>Welcome aboard!</h4>
        <p className='text-primary/70 text-sm tracking-wide'>Already have an account? <Link href='/login' className='text-primary hover:underline transition-all duration-300'>Sign in</Link></p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full px-4">
      <div className='flex flex-col gap-2'>
          <input 
            type='username'
            className='w-full px-3 py-2 border rounded-md bg-black/20 border-subtle/50 placeholder:text-sm focus:border-subtle focus:outline-none ease-in-out transition-all duration-300'
            placeholder='Your name'
            {...register('username', { required: true })}
          />
          {errors.email && <p className='text-subtle text-sm px-1'>Username is required</p>}
        </div>

        <div className='flex flex-col gap-2'>
          <input 
            type='email'
            className='w-full px-3 py-2 border rounded-md bg-black/20 border-subtle/50 placeholder:text-sm focus:border-subtle focus:outline-none ease-in-out transition-all duration-300'
            placeholder='Your email'
            {...register('email', { required: true })}
          />
          {errors.email && <p className='text-subtle text-sm px-1'>Email is required</p>}
        </div>
        
        <div className='flex flex-col gap-2'>
          <input 
            type='password'
            className='w-full px-3 py-2 border rounded-md bg-black/20 border-subtle/50 placeholder:text-sm focus:border-subtle focus:outline-none ease-in-out transition-all duration-300'
            placeholder='Your password'
            {...register('password', { required: true })} 
          />
          {errors.password && <p className='text-subtle text-sm px-1'>Password is required</p>}
        </div>
        
        <button 
          type='submit'
          className='w-full p-2 bg-primary text-base font-medium rounded-lg hover:scale-95 transition-all duration-300'
        >
          Sign up
        </button>
      </form>

      <div className='flex flex-col items-center justify-center gap-6 w-full'>
        <div className='flex gap-1.5 w-full items-center justify-center px-12'>
          <div className='bg-primary/30 py-[0.1px] flex-1'/>
          <p className='text-xs text-primary/80'>Or join us using</p>
          <div className='bg-primary/30 py-[0.1px] flex-1'/>
        </div>
        <div className='flex w-full gap-4 justify-center items-center px-12'>
          <div className='py-2 px-4 bg-white items-center justify-center rounded-md'>
            <Image className='' src={'/google.png'} height={20} width={20} alt='google icon'></Image>
          </div>
          <div className='py-2 px-4 bg-white items-center justify-center rounded-md'>
            <Image className='' src={'/twitter.png'} height={20} width={20} alt='twitter icon'></Image>
          </div>
          <div className='py-2 px-4 bg-white items-center justify-center rounded-md'>
            <Image className='' src={'/apple.png'} height={20} width={20} alt='apple icon'></Image>
          </div>
        </div>
      </div>

      <footer className='text-xs px-12 text-center'>
        <p className='text-primary/70 text-sm tracking-wide'>Curious about how this works? ⭐️&nbsp; <Link href='https://github.com/dhanushd-27/DoodleBoard' target='_blank' className='text-primary hover:underline transition-all duration-300 text-xs'>View the code on GitHub</Link></p>
      </footer>
    </div>
  )
}
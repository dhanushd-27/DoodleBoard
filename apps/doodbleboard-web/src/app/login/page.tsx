"use client"
import { setCookie } from '@/actions/setCookie';
import { useAppDispatch } from '@/lib/hooks/reduxHooks';
import { setState } from '@/lib/store/isAuthenticated/isAuthenticatedSlice';
import { useRouter } from 'next/navigation';

import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response: boolean = await setCookie({ email, password });

    if(response) {
      dispatch(setState(true));
      toast.success("Login Successfull");
      router.push('/canvas/4');
    } else {
      toast.error("Login Failed!");
      router.push('/')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-2xl">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" onClick={ handleSubmit }>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

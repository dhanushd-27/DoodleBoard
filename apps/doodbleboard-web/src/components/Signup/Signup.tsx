"use client"

import signupPlaceholder from "@/assets/signup.jpg"
import React from 'react'
import { signUpFunc } from '@/actions/authActions/signup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from 'next/link';


export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!username || !email || !password) {
      toast.error("All values are must be provided");
      return;
    }
    
    const status = await signUpFunc({ username, email, password});

    console.log(status);

    switch (status) {
      case 201: 
        toast.success("Sign up successful");
        router.push('/login');
        break;
      
      case 403:
        toast.error("User Already Exists");
        router.push('/');
        break;

      case 400:
        toast.error("Bad Request");
        router.push('/');
        break;

      case 500:
        toast.error("Internal Server Error");
        router.push('/');
        break;

      default:
        toast.error("Unexpected error occurred");
        router.push('/');
        break;
    }
  };
  
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={ handleSubmit }>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Join Us</h1>
                <p className="text-balance text-muted-foreground">
                  Sign up to your Doodleboard account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Joe Root"
                  onChange={ (e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={ (e) => {
                    setEmail(e.target.value);
                  } }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  onChange={ (e) => setPassword(e.target.value) } 
                  placeholder="********"
                  />
              </div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href={'/login'} className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block mr-8 rounded-2xl">
            <Image
              src={ signupPlaceholder }
              alt="Image"
              className="absolute inset-0 h-full object-cover rounded-2xl"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

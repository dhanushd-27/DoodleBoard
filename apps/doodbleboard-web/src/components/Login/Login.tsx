"use client"
import loginPlaceholder from "@/assets/login.jpg"
import { setCookie } from '@/actions/authActions/login';
import { useAppDispatch } from '@/lib/hooks/reduxHooks';
import { setState } from '@/lib/store/isAuthenticated/isAuthenticatedSlice';
import { useRouter } from 'next/navigation';

import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from 'next/link';

export function LoginForm() {
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
      router.push('/dashboard');
    } else {
      toast.error("Login Failed!");
      router.push('/')
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={ handleSubmit }>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Doodleboard account
                </p>
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
                <Input id="password" type="password" required onChange={ (e) => setPassword(e.target.value) } placeholder="********" />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href={'/signup'} className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block mr-8 rounded-2xl">
            <Image
              src={ loginPlaceholder }
              alt="Image"
              className="absolute inset-0 h-full object-cover rounded-2xl"
              priority={ true }
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

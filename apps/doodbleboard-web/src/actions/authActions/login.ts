"use server"

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { logIn } from "@repo/types/auth"

export async function setCookie({ email, password }: logIn) {
  try {
    const response = await axios.post(`${process.env.BACKEND_API_URL}/login`, {
      "email": email,
      "password": password,
    }, {
      withCredentials: true
    });
  
    const cookie = response.headers['set-cookie'] as string[];
    const token = cookie[0]?.split('=')[1].split(";")[0] as string;
    (await cookies()).set("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });
    return true;
  } catch (error) {
    const e = error as AxiosError;
    console.log("Something went wrong" + e);
    return false;
  }
}
"use server"

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function setCookie() {
  try {
    const response = await axios.post('http://localhost:3002/api/v1/login', {
      "email": "g@gmail.com",
      "password": "123123123"
    }, {
      withCredentials: true
    });
  
    const cookie = response.headers['set-cookie'] as string[];
    const token = cookie[0]?.split('=')[1].split(";")[0] as string;
    (await cookies()).set("token", token);
    return true;
  } catch (error) {
    const e = error as AxiosError;
    console.log("Something went wrong" + e);
    return false;
  }
}
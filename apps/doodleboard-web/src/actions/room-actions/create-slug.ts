'use server'

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function createRoom({ name }: { name: string} ) {
  try {
    const cookieStore = await cookies();
    const tokenObject = cookieStore.get("token");

    if(!tokenObject) return;

    const token = tokenObject.value;

    const response = await axios.post(`${process.env.BACKEND_API_URL}/room/create`, {
      name: name,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.payload.slug;
  } catch (error) {
    const e = error as AxiosError;
    console.log("Something went wrong" + e.message);
    return e.response;
  }
}
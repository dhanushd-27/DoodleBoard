'use server'

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function getRoomId (params: {slug: string}) {
  try {
    const slug = params.slug;
    const cookieStore = await cookies();
    const tokenObject = cookieStore.get("token");

    if(!tokenObject) return;

    const token = tokenObject.value;

    const response = await axios.get(`${process.env.BACKEND_API_URL}/room/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.payload.roomId;

  } catch (error) {
    const e = error as AxiosError;
    console.log("Something went wrong" + e.message);
    return null;
  }
}
'use server'

import axios, { AxiosError } from "axios";

export async function getRoomId ({ slug }: { slug: string }) {
  try {
    const cookieStore 
    const response = await axios.get(`${process.env.BACKEND_API_URL}/room/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const roomId = response.data

    return roomId;
  } catch (error) {
    const e = error as AxiosError;
    console.log("Something went wrong" + e.message);
    return e.status;
  }
}
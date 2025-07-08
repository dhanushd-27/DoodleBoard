"use server"

import axios from "axios"
import { cookies } from "next/headers"

export const joinRoom = async (roomId: string) => {
  try {
    const cookieStore = await cookies();

    const tokenCookie = cookieStore.get("token");

    if (!tokenCookie) {
      return null;
    }
    const token = tokenCookie.value;

    const response = await axios.post(`${process.env.BACKEND_API_URL}/room/join/${roomId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status !== 200) {
      return null;
    }

    return true;
  } catch (error) {
    const e = error as Error;
    console.error("Error joining room:", e.message);
    return null;
  }
}
"use server"

import axios from "axios";
import { cookies } from "next/headers";

type Rooms = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  adminId: string;
}[]

export const getRoomList = async () => {
  try {
    const cookieStore = await cookies();

    const tokenCookie = cookieStore.get("token");

    if (!tokenCookie) {
      return null;
    }
    const token = tokenCookie.value;

    const response = await axios.get(`${process.env.BACKEND_API_URL}/room/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const rooms = response.data.payload.rooms;

    if(!rooms) {
      return null;
    }

    return rooms as Rooms;
  } catch (error) {
    const e = error as Error;
    console.error("Error getting room list:", e.message);
    return null;
  }
};
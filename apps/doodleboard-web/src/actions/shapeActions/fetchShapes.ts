"use server"

import axios from "axios";
import { cookies } from "next/headers";

export const fetchShapes = async ({ roomId }: { roomId: string }) => {
  try {
    const cookieStore = await cookies();
    const tokenObject = cookieStore.get("token");

    if(!tokenObject) return;

    const token = tokenObject.value;
    const res = await axios.get(`${process.env.BACKEND_API_URL}/room/chats/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const shapesArray = res.data.payload.shapes;

    const shapeMessage = shapesArray.map((shape) => shape.message);
    return shapeMessage;
  } catch (error) {
    console.log(error);
    return null;
  }
}

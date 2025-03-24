"use server"

import axios from "axios";
import { cookies } from "next/headers";

export const fetchShapes = async () => {
  try {
    const cookieStore = await cookies();
    const tokenObject = cookieStore.get("token");

    if(!tokenObject) return;

    const token = tokenObject.value;
    const res = await axios.get("http://localhost:3002/api/v1/room/chats/cm8i3cmj10001xjhz167mjhut", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const shapesArray = res.data.payload.shapes;

    const shapeMessage = shapesArray.map((shape) => shape.message);
    return shapeMessage;
  } catch (error) {
    console.log(error);
  }
}

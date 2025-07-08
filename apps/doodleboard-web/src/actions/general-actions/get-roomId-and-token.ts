"use server"

import { cookies } from "next/headers";
import { getRoomId } from "../room-actions/get-roomId";

export const getRoomIdAndToken = async ({ slug }: { slug: string}) => {
  try {
    const roomId = await getRoomId({ slug: slug });
    const cookieStore = await cookies();
    const tokenObject = cookieStore.get("token");

    if(!tokenObject) throw new Error("Token not found");

    const token = tokenObject.value;

    return { roomId, token };
  } catch (error) {
    const e = error as Error;
    console.log("Invalid Slug or Token Not Found ", e.message)
    return { roomId: null, token: null };
  }
}
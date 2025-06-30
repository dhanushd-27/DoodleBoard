"use server"

import { cookies } from "next/headers"
import * as jose from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
const secretKey = new TextEncoder().encode(JWT_SECRET);

export const getUserDetails = async () => {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");

    if(!tokenCookie) {
      return;
    }

    const token = tokenCookie.value;

  const jwtPayload = await jose.jwtVerify(token, secretKey);

  return jwtPayload.payload as {
    name: string;
    email: string;
  }
  } catch (error) {
    const e = error as Error;
    console.error("Error in getUserDetails:", e.message);
    return null;
  }
}
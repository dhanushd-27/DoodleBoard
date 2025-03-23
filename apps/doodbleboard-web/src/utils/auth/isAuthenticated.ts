import { cookies } from "next/headers";
import * as jose from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function Verify(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const tokenObject = cookieStore.get("token");

    if(!tokenObject) return false;

    const token = tokenObject.value as string;
    
    await jose.jwtVerify(token, secretKey);

    return true;
  } catch (error) {
    const e = error as Error;
    console.error("Error in Verify:", e.message);
    return false;
  }
}
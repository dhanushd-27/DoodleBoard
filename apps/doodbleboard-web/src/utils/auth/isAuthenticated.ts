import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;

export async function Verify(): Promise<boolean> {
  const cookieStore = await cookies();
  const tokenObject = cookieStore.get("token");

  if(!tokenObject) return false;

  const isVerified = jwt.verify(tokenObject.value,  JWT_SECRET);

  if(!isVerified) return false;

  return true;
}
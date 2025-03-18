import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await axios.post('http://localhost:3002/api/v1/login', {
    "email": "g@gmail.com",
    "password": "123123123"
  }, {
    withCredentials: true
  });

  const cookie = response.headers['set-cookie'] as string[];
  const token = cookie[0]?.split('=')[1].split(";")[0] as string;
  (await cookies()).set("token", token);
  console.log(token);
  return NextResponse.json({
    res: "logged in"
  });
}
"use server"

import { cookies } from "next/headers";

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");

    if (!tokenCookie) {
      return null;
    }

    cookieStore.delete("token");
  } catch (error) {
    const e = error as Error;
    console.error("Error logging out:", e.message);
    return null;
  }
};
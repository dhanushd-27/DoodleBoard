'use server'
import { signUp } from "@repo/types/auth";
import axios, { AxiosError } from "axios";

export async function signUpFunc ({ username, email, password }: signUp) {
  try {
    const response = await axios.post(`${process.env.BACKEND_API_URL}/signup`, {
      username: username,
      email: email,
      password: password
    });

    return response.status;
  } catch (error) {
    const e = error as AxiosError;
    console.log("Something went wrong" + e.message);
    return e.status;
  }
}
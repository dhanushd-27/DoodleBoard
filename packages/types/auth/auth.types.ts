import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export type signUp = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export type logIn = z.infer<typeof loginSchema>

export interface User {
  email: string;
  name: string;
  id: string;
  iat: number;
}
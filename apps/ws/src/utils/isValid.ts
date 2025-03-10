import "../config/env";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const isValidToken = (token: string): boolean => {
  const isValid = jwt.verify(token, JWT_SECRET);

  if (!isValid) {
    return false
  }

  return true;
}
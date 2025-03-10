import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const isValidToken = (token: string): boolean => {
  const isValid = jwt.verify(token, JWT_SECRET);

  if (!isValid) {
    return false
  }

  return true;
}
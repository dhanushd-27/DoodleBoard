import "../config/env";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const isValidToken = (token: string) => {
  try {
    const isValid = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!isValid) {
      return null;
    }

    return {
      email: isValid.email as string,
      name: isValid.name as string,
      id: isValid.id as string,
      iat: isValid.iat as number,
    }
  } catch (error) {
    const e = error as JsonWebTokenError;
    console.log(e.message);
    return null;
  }
}
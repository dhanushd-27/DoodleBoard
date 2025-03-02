import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({
      message: "Unauthorized Access: No token provided"
    });
    return;
  }

  try {
    const isValid = jwt.verify(authorization, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = {
      id: isValid.id,
      email: isValid.email
    };

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized Access: Invalid token"
    });
    return;
  }
};
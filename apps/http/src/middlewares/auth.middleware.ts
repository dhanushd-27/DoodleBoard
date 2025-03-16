import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
  const token = req.cookies.token;

	if(!token) {
		res.status(401).json({
		message: "Unauthorized"
		});
		return;
	}

  const isValid = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

  if(!isValid) {
    res.status(401).json({
      message: "Unauthorized"
    });
    return;
  }

  req.user = isValid as {
    id: string;
    email: string;
    name: string;
  };

  next();
 } catch (error) {
  res.status(500).json({
    message: "Something went wrong"
  })
 }
}
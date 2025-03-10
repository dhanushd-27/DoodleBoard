import { Request, Response, Router } from "express";
import { loginController } from "../controllers/auth/login.controller";
import { logoutController } from "../controllers/auth/logout.controller";
import { signUpController } from "../controllers/auth/signup.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRoutes: Router = Router();

authRoutes.post("/login", loginController);
authRoutes.post("/logout", logoutController);
authRoutes.post("/signup", signUpController);
authRoutes.get("/me", authMiddleware, (req: Request, res: Response) => {
  res.json(req.user);
});

export { authRoutes };
import { Router } from "express";
import { loginController } from "../controllers/auth/login.controller";
import { logoutController } from "../controllers/auth/logout.controller";
import { signUpController } from "../controllers/auth/signup.controller";

const authRoutes: Router = Router();

authRoutes.get("/login", loginController);
authRoutes.get("/logout", logoutController);
authRoutes.get("/signup", signUpController);

export { authRoutes };
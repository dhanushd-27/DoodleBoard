import { Router } from "express";
import { loginController } from "../controllers/auth/login.controller";
import { signUpController } from "../controllers/auth/signup.controller";

const authRoutes: Router = Router();

authRoutes.post("/login", loginController);
authRoutes.post("/signup", signUpController);

export { authRoutes };
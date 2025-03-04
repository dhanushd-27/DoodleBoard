import { Router } from "express";
import { signInController, signUpController } from "../controllers/general.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const generalRoutes: Router = Router();

generalRoutes.post('/signup', signUpController);

generalRoutes.post('/signin', signInController);

export default generalRoutes;
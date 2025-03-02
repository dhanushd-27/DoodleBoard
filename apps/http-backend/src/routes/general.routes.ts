import { Router } from "express";
import { createRoomController, signInController, signUpController } from "../controllers/general.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const generalRoutes = Router();

generalRoutes.post('/signup', signUpController);

generalRoutes.post('/signin', signInController);

generalRoutes.post('/create-room', authMiddleware, createRoomController);
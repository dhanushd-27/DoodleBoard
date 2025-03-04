import { Router } from "express";
import { createRoomController, getRoomChatController } from "../controllers/chat.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const chatRouter: Router = Router();

chatRouter.get("/:roomId", authMiddleware, getRoomChatController);

chatRouter.post("/create/room", authMiddleware, createRoomController);

export default chatRouter;
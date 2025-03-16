import { Router } from "express";
import { getChatsController, getRoomIdController, roomMembersController } from "../controllers/room/room.controller";
import { createRoomController } from "../controllers/room/create.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { joinRoomController } from "../controllers/room/join.controller";
import { exitRoomController } from "../controllers/room/exit.controller";

export const roomRoutes: Router = Router();

roomRoutes.post("/create",authMiddleware, createRoomController);
roomRoutes.get("/chats",authMiddleware, getChatsController);
roomRoutes.post("/join/:roomId", authMiddleware, joinRoomController);
roomRoutes.get('/members/:roomId', authMiddleware, roomMembersController);
roomRoutes.put("/exit/:roomId", authMiddleware, exitRoomController);
roomRoutes.get('/:slug', authMiddleware, getRoomIdController);
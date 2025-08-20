import { Router } from 'express'
import {
  getChatsController,
  getRoomIdController,
  roomMembersController,
} from '../controllers/room/room.controller.js'
import { createRoomController } from '../controllers/room/create.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { joinRoomController } from '../controllers/room/join.controller.js'
import { exitRoomController } from '../controllers/room/exit.controller.js'
import { listRoomsController } from '../controllers/room/list-rooms.controller.js'

export const roomRoutes: Router = Router()

roomRoutes.post('/create', authMiddleware, createRoomController)
roomRoutes.get('/chats/:roomId', authMiddleware, getChatsController)
roomRoutes.post('/join/:roomId', authMiddleware, joinRoomController)
roomRoutes.get('/members/:roomId', authMiddleware, roomMembersController)
roomRoutes.put('/exit/:roomId', authMiddleware, exitRoomController)
roomRoutes.get('/list', authMiddleware, listRoomsController)
roomRoutes.get('/:slug', authMiddleware, getRoomIdController)

import WebSocket from "ws"

interface User {
  userId: string,
  socket: WebSocket,
  rooms: string[]
}

export const userCollection: User[] = []

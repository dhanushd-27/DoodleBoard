import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRoutes } from './routes/auth.routes';
import { roomRoutes } from './routes/room.routes';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use('/api/v1', authRoutes);
app.use('/api/v1/room', roomRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
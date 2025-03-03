import dotenv from "dotenv";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string);
const JWT_SECRET = process.env.JWT_SECRET as string || "default_secret";

export { PORT, JWT_SECRET };
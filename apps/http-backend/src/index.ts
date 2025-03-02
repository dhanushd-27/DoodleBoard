import express from "express";
import dotenv from "dotenv"
import generalRoutes from "./routes/general.routes";

dotenv.config()
const app = express();

app.use(express.json());
app.use('/', generalRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
import express from "express";
import dotenv from "dotenv"

dotenv.config({ path: "./"})
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
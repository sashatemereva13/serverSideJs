import express from "express";
import cors from "cors";
import router from "./routes/studentsRoute.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.use("/", router);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();

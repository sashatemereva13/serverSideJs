// starts server
// loads middleware
// connects DB
// registers routes
import "./config/env.js";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

import connectDB from "./config/db.js";

import logger from "./middleware/logger.js";
import { AppError } from "./utils/errors.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(logger);
app.use(express.static("public"));

app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/upload", uploadRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.log(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    error: "internal server error",
  });
});

app.use((req, res, next) => {
  next(new AppError("rrroute not found", 404));
});

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();

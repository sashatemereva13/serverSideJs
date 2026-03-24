import express from "express";
import { createStudent, getStudents } from "./controllers.js";

const router = express.Router();

router.get("/students", getStudents);
router.post("/students", createStudent);

export default router;

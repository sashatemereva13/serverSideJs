import express from "express";
import {
  createStudent,
  getStudents,
  getStudent,
  deleteStudentController,
  updateStudentController,
} from "../controllers/studentsController.js";

const router = express.Router();

router.get("/api/students", getStudents);
router.get("/api/students/:id", getStudent);
router.delete("/api/students/:id", deleteStudentController);
router.post("/api/students", createStudent);
router.put("/api/students/:id", updateStudentController);

export default router;

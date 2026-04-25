import {
  loginStudentController,
  registerStudentController,
} from "../controllers/studentsController.js";
import validateStudent from "../middleware/validateStudent.js";
import express from "express";

const router = express.Router();

router.post("/register", validateStudent, registerStudentController);
router.post("/login", loginStudentController);

export default router;

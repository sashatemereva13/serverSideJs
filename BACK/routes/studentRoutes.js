import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createStudent,
  deleteStudentController,
  getPublicStudentsController,
  getStudent,
  getStudents,
  updateProfileController,
  updateStudentController,
} from "../controllers/studentsController.js";
import ownershipOrAdminMiddleware from "../middleware/ownershipOrAdminMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getPublicStudentsController);

router.get("/admin", authMiddleware, adminMiddleware, getStudents);
router.get("/:id", getStudent);

// PUT only for admins
router.put("/:id", authMiddleware, adminMiddleware, updateStudentController);

router.patch(
  "/:id/profile",
  authMiddleware,
  ownershipOrAdminMiddleware,
  updateProfileController,
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  ownershipOrAdminMiddleware,
  deleteStudentController,
);

// create accounts on behalf of others
router.post("/", authMiddleware, adminMiddleware, createStudent);

export default router;

import express from "express";
import authMiddleware from "../middleware/adminMiddleware.js";
import * as ctrl from "../controllers/courseController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", ctrl.getCourses);
router.get("/:id", ctrl.getCourse);
router.post("/", ctrl.createCourse);
router.put("/:id", ctrl.updateCourse);
router.delete("/:id", ctrl.deleteCourse);

export default router;

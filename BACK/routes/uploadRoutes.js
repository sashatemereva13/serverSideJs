import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";
import upload from "../middleware/multer-config.js";

const router = express.Router();

router.post(
  "/students/upload",
  authMiddleware,
  upload.single("image"),
  (req, res) => {
    res.json({
      message: "File uploaded successfully",
      file: req.file,
    });
  },
);

export default router;

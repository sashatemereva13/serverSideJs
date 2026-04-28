import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  credits: { type: Number, required: true },
  instructor: { type: String, required: true },
});

export default mongoose.model("Course", courseSchema);

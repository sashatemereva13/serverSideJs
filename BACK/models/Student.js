// define a student

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    major: {
      type: String,
      trim: true,
    },
    gpa: {
      type: Number,
      min: 0,
      max: 4,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },

    avatar: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: null,
      maxLength: 300,
    },

    skills: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true },
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

studentSchema.index({ name: "text", major: "text", bio: "text" });

const Student = mongoose.model("Student", studentSchema);

export default Student;

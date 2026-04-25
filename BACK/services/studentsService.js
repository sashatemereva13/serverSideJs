//talks directly to the DB

import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} from "../utils/errors.js";

import {
  checkLoginAttempts,
  resetLoginAttempts,
} from "../utils/rateLimiter.js";

const getPublicStudents = async (filters = {}) => {
  const result = await getAllStudents(filters);

  result.students = result.students.map((student) => ({
    id: student._id,
    name: student.name,
    major: student.major,
    bio: student.bio,
    skills: student.skills,
    avatar: student.avatar,
  }));

  return result;
};

// get all students
const getAllStudents = async (filters = {}) => {
  const query = {};
  let sort = {};

  if (filters.search) {
    query.$text = { $search: filters.search };
    sort = { score: { $meta: "textScore" } };
  } else if (filters.sortBy) {
    const order = filters.order === "desc" ? -1 : 1;
    sort[filters.sortBy] = order;
  }

  // filter by major
  if (filters.major) {
    query.major = filters.major;
  }

  // filter by GPA
  if (filters.minGpa) {
    query.gpa = { $gte: Number(filters.minGpa) };
  }

  // pagination
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const [students, total] = await Promise.all([
    Student.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(
        filters.search
          ? { score: { $meta: "textScore" }, password: 0 }
          : "-password",
      ),

    Student.countDocuments(query),
  ]);

  return { students, total, page, limit, pages: Math.ceil(total / limit) };
};

// get one student
const getStudentById = async (id) => {
  const student = await Student.findById(id).select(
    "name major bio skills avatar",
  );

  if (!student) {
    throw new NotFoundError("student not found");
  }

  return student;
};

// create one
const addStudent = async (data) => {
  const newData = { ...data };

  if (newData.email) {
    newData.email = newData.email.toLowerCase().trim();
  }

  const student = new Student(newData);

  return await student.save();
};

// update student on admin level
const updateStudent = async (id, data) => {
  const updatedData = { ...data };

  if (updatedData.email) {
    updatedData.email = updatedData.email.toLowerCase().trim();
  }

  const updatedStudent = await Student.findById(id);

  if (!updatedStudent) {
    throw new NotFoundError("student not found");
  }

  Object.assign(updatedStudent, updatedData);

  await updatedStudent.save();

  const result = updatedStudent.toObject();
  delete result.password;
  return result;
};

// update profile
const updateProfile = async (id, data) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new NotFoundError("student not found");
  }

  //only allow to change these
  if (data.bio !== undefined) student.bio = data.bio;
  if (data.avatar !== undefined) student.avatar = data.avatar;
  if (data.skills !== undefined) student.skills = data.skills;

  await student.save();

  const result = student.toObject();

  delete result.password;

  return result;
};

// delete one
const deleteStudent = async (id) => {
  const deletedStudent = await Student.findByIdAndDelete(id);

  if (!deletedStudent) {
    throw new NotFoundError("student not found");
  }

  const result = deletedStudent.toObject();
  delete result.password;
  return result;
};

// find by email
const findStudentByEmail = async (email) => {
  if (!email) {
    throw new BadRequestError("email is required");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const student = await Student.findOne({ email: normalizedEmail });

  if (!student) {
    throw new NotFoundError("student not found");
  }

  return student;
};

// register one
const registerStudent = async ({ name, email, password, major, gpa }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingStudent = await Student.findOne({ email: normalizedEmail });

  if (existingStudent) {
    throw new BadRequestError("Student already exists");
  }

  const student = new Student({
    name,
    email: normalizedEmail,
    password,
    major,
    gpa,
  });

  const savedStudent = await student.save();

  const token = generateToken(savedStudent);

  return {
    token,
    student: {
      id: savedStudent._id,
      name: savedStudent.name,
      email: savedStudent.email,
      major: savedStudent.major,
      gpa: savedStudent.gpa,
      role: savedStudent.role,
    },
  };
};

// login one
const loginStudent = async ({ email, password, ip }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const key = `login:${normalizedEmail}:${ip}`;

  const rateLimit = await checkLoginAttempts(key);

  if (rateLimit.blocked) {
    throw new UnauthorizedError(
      `Too many attempts... try again in ${rateLimit.retryAfter}s`,
    );
  }

  const student = await Student.findOne({ email: normalizedEmail }).select(
    "+password",
  );

  // don't reveal whether the email exists
  if (!student) {
    throw new UnauthorizedError("invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    throw new UnauthorizedError("invalid credentials");
  }

  await resetLoginAttempts(key);

  student.lastLogin = new Date();
  await student.save();

  const token = generateToken(student);

  return {
    token,
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      major: student.major,
      gpa: student.gpa,
      lastLogin: student.lastLogin,
      role: student.role,
    },
  };
};

export {
  getPublicStudents,
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  updateProfile,
  deleteStudent,
  findStudentByEmail,
  registerStudent,
  loginStudent,
};

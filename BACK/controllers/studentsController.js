// receives HTTP request
// calls service

import {
  getAllStudents,
  getStudentById,
  getPublicStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  registerStudent,
  loginStudent,
  updateProfile,
} from "../services/studentsService.js";
import { getCache, setCache } from "../utils/cache.js";

const getPublicStudentsController = async (req, res, next) => {
  try {
    const result = await getPublicStudents(req.query);

    res.json({
      status: "success",
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.pages,
      data: result.students,
    });
  } catch (err) {
    next(err);
  }
};

// get all
const getStudents = async (req, res, next) => {
  try {
    const cacheKey = `students:${JSON.stringify(req.query)}`;

    const cached = await getCache(cacheKey);

    if (cached) {
      return res.json({
        ...cached,
        cached: true,
      });
    }

    const result = await getAllStudents(req.query);

    res.json({
      status: "success",
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.pages,
      data: result.students,
    });

    await setCache(cacheKey, response, 60);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

// get one
const getStudent = async (req, res, next) => {
  try {
    const student = await getStudentById(req.params.id);

    res.json(student);
  } catch (err) {
    next(err);
  }
};

// create one
const createStudent = async (req, res, next) => {
  try {
    const student = await addStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

// update one
const updateStudentController = async (req, res, next) => {
  try {
    const updated = await updateStudent(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const updateProfileController = async (req, res, next) => {
  try {
    const updated = await updateProfile(req.params.id, req.body);

    res.json({
      status: "success",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

// delete one
const deleteStudentController = async (req, res, next) => {
  try {
    const deleted = await deleteStudent(req.params.id);

    res.json({
      message: "this student is deleted",
      student: deleted,
    });
  } catch (err) {
    next(err);
  }
};

// register
const registerStudentController = async (req, res, next) => {
  try {
    const result = await registerStudent(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// login
const loginStudentController = async (req, res, next) => {
  try {
    const result = await loginStudent({ ...req.body, ip: req.ip });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export {
  getPublicStudentsController,
  getStudent,
  getStudents,
  createStudent,
  updateStudentController,
  updateProfileController,
  deleteStudentController,
  registerStudentController,
  loginStudentController,
};

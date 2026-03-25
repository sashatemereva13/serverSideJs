import {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../service/service.js";

const getStudents = (req, res) => {
  res.json(getAllStudents());
};

const getStudent = (req, res) => {
  const student = getStudentById(Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Not found" });

  res.json(student);
};

const createStudent = (req, res) => {
  const student = addStudent(req.body);
  res.status(201).json(student);
};

const updateStudentController = (req, res) => {
  const updated = updateStudent(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });

  res.json(updated);
};

const deleteStudentController = (req, res) => {
  const deleted = deleteStudent(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Not found" });

  res.json(deleted);
};

export {
  getStudent,
  getStudents,
  createStudent,
  updateStudentController,
  deleteStudentController,
};

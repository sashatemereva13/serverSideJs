import {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentsService.js";

// get all
const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get one
const getStudent = async (req, res) => {
  try {
    const student = getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: "Not found" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create one
const createStudent = async (req, res) => {
  try {
    const student = addStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// update one
const updateStudentController = async (req, res) => {
  try {
    const updated = updateStudent(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// delete one
const deleteStudentController = async (req, res) => {
  try {
    const deleted = deleteStudent(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });

    res.json(deleted);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

export {
  getStudent,
  getStudents,
  createStudent,
  updateStudentController,
  deleteStudentController,
};

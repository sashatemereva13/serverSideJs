import Student from "../models/Student.js";

// get all students
const getAllStudents = async () => {
  return await Student.find();
};

// get one student
const getStudentById = async (id) => {
  return await Student.findById(id);
};

// create one
const addStudent = async (data) => {
  const student = new Student(data);
  return await student.save();
};

// update one
const updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

// delete one
const deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};

export {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};

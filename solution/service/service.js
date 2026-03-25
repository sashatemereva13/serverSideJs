import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load data
const filePath = path.join(__dirname, "../../students.json");

let students = [];

try {
  const studentsData = fs.readFileSync(filePath, "utf-8");
  students = JSON.parse(studentsData);
} catch (error) {
  students = [];
}

const saveToFile = () => {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
};

// get all students
const getAllStudents = () => students;

// get one student
const getStudentById = (req, res) => students.find((s) => s.id === id);

const addStudent = (student) => {
  const newStudent = { ...student, id: Date.now() };
  students.push(newStudent);
  saveToFile();
  return newStudent;
};

const updateStudent = (id, data) => {
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) return null;

  students[index] = { ...students[index], ...data };
  saveToFile();

  return students[index];
};

// delete a student
const deleteStudent = (req, res) => {
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) return null;

  const deleted = students.splice(index, 1);
  saveToFile();
  return deleted[0];
};

export { getAllStudents };
export { getStudentById };
export { addStudent };
export { deleteStudent };
export { updateStudent };

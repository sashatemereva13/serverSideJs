import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load data
const filePath = path.join(__dirname, "../students.json");

let students = [];
try {
  const studentsData = fs.readFileSync(filePath, "utf-8");
  students = JSON.parse(studentsData);
} catch (error) {
  students = [];
}

const getStudents = (req, res) => {
  res.status(200).json(students);
};

const createStudent = (req, res) => {
  try {
    const newStudent = req.body;

    console.log("Incoming data:", newStudent);

    newStudent.id = Date.now();

    students.push(newStudent);

    // persist to file
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

    res.status(201).json({
      message: "Student received successfully",
      data: newStudent,
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

export { getStudents };
export { createStudent };

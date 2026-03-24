import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load data
const filePath = path.join(__dirname, "../students.json");

const getStudents = (req, res) => {
  try {
    const studentsData = fs.readFileSync(filePath, "utf-8");
    let students = JSON.parse(studentsData);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to read students" });
  }
};

export { getStudents };

import Courses from "../models/Courses.js";

export const getCourses = () => Courses.find().lean();
export const getCourseById = (id) => Courses.findById(id).lean();

export const createCourse = (data) => Courses.create(data);

export const updateCourse = (id, data) =>
  Courses.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const deleteCourse = (id) => Courses.findByIdAndDelete(id);

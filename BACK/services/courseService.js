import Courses from "../models/Courses";

export const getCourses = () => Courses.find();
export const getCourseById = (id) => Courses.findById(id);
export const createCourse = (data) => Courses.create(data);
export const updateCourse = (id, data) =>
  Courses.findByIdAndUpdate(id, data, { new: true });
export const deleteCourse = (id) => Courses.findByIdAndDelete(id);

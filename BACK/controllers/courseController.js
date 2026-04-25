import * as service from "../services/courseService.js";

export const getCourses = async (req, res) => {
  const data = await service.getCourses();
  res.json(data);
};

export const getCourse = async (req, res) => {
  const data = await service.getCourseById(req.params.id);
  res.json(data);
};

export const createCourse = async (req, res) => {
  const data = await service.createCourse(req.body);
  res.status(201).json(data);
};

export const updateCourse = async (req, res) => {
  const data = await service.updateCourse(req.params.id, req.body);
  res.json(data);
};

export const deleteCourse = async (req, res) => {
  await service.deleteCourse(req.params.id);
  res.status(204).end();
};

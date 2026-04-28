import * as service from "../services/courseService.js";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../utils/errors.js";

// get all courses
export const getCourses = async (req, res, next) => {
  try {
    const data = await service.getCourses();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// get one course
export const getCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("invalid course id");
    }

    const data = await service.getCourseById(id);

    if (!data) {
      throw new NotFoundError("course not found");
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const data = await service.createCourse(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("invalid course id");
    }
    const data = await service.updateCourse(id, req.body);

    if (!data) {
      throw new NotFoundError("course not found");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("invalid course id");
    }

    const data = await service.deleteCourse(id);

    if (!data) {
      throw new NotFoundError("course not found");
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

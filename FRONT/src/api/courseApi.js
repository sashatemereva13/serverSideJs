import api from "./api.js";

export const getCourses = () => api.get("/courses");

export const createCourse = (data) => api.ost("/courses", data);

export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);

export const deleteCourse = (id) => api.delete(`/courses/${id}`);

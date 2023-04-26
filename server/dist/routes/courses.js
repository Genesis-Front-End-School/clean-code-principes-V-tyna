"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courses_1 = require("../controllers/courses");
const coursesRouter = (0, express_1.Router)();
coursesRouter.get('/', courses_1.getAllCourses);
coursesRouter.get('/course/:courseId', courses_1.getCourseById);
exports.default = coursesRouter;

const { Router } = require('express');
const { getCourseById, getAllCourses } = require('../controllers/courses');

const coursesRouter = Router();

coursesRouter.get('/', getAllCourses);

coursesRouter.get('/course/:courseId', getCourseById);

module.exports = coursesRouter;

import { Router } from 'express';
import { getCourseById, getAllCourses } from '../controllers/courses';

const coursesRouter = Router();

coursesRouter.get('/', getAllCourses);

coursesRouter.get('/course/:courseId', getCourseById);

export default coursesRouter;

import { NextFunction, Request, Response } from 'express';
import { PaginationParams } from '../models/paginationParams';
import { fetchAllCourses, fetchCourse } from '../utils/fetchData';

export const getAllCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const paginationParams = <PaginationParams><unknown>req.query;
		const response = await fetchAllCourses(paginationParams);
		if (response.error) {
			throw new Error(<string>response.error);
		}
		const { courses, allCoursesLength } = response;
		res.status(200).json({ courses, allCoursesLength });
	} catch (e) {
		next(e);
	}
};

export const getCourseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { courseId } = req.params;
		const course = await fetchCourse(courseId);
		if (course.error) {
			throw new Error(course.error);
		}
		res.status(200).json(course);
	} catch (e) {
		next(e);
	}
};

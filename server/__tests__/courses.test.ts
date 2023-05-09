import { Request, Response } from 'express';
import { getAllCourses, getCourseById } from '../src/controllers/courses';
import * as fetchData from '../src/utils/fetchData';
import { PaginationParams } from '../src/models/paginationParams';


describe('courses controllers', () => {
  const next = jest.fn();
  const res = {} as unknown as Response;
  res.json = jest.fn();
  res.status = () => res;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllCourses', () => {
    const params: PaginationParams = { limit: '10', offset: '0' };

    it('should return a list of courses and their count', async () => {
      const response = { courses: [{}], allCoursesLength: 1 };
      jest.spyOn(fetchData, 'fetchAllCourses').mockReturnValue(Promise.resolve(response));

      await getAllCourses(<Request><unknown>{ query: params }, <Response>res, next);

      expect(fetchData.fetchAllCourses).toHaveBeenCalledWith(params);
      expect(next).not.toHaveBeenCalled();
    });

    it('should call "next" function if an error occurs in fetch response', async () => {
      const response = { error: 'Test error' };
      const expectedErr = new Error(response.error);
      jest.spyOn(fetchData, 'fetchAllCourses').mockReturnValue(Promise.resolve(response));

      await getAllCourses(<Request><unknown>{ query: params }, <Response>res, next);

      expect(next).toHaveBeenCalledWith(expectedErr);
    });
  });

  describe('getCourseById', () => {
    const courseId = 'someId';
    const params = { courseId };

    it('should return a course', async () => {
      const response = {};
      jest.spyOn(fetchData, 'fetchCourse').mockReturnValue(Promise.resolve(response));

      await getCourseById(<Request><unknown>{ params: params }, <Response><unknown>res, next);

      expect(fetchData.fetchCourse).toHaveBeenCalledWith(courseId);
      expect(next).not.toHaveBeenCalled();
    });

    it('should call "next" function if an error occurs in fetch response', async () => {
      const response = { error: 'Test error' };
      const expectedErr = new Error(response.error);
      jest.spyOn(fetchData, 'fetchCourse').mockReturnValue(Promise.resolve(response));

      await getCourseById(<Request><unknown>{ params: params }, <Response><unknown>res, next);

      expect(next).toHaveBeenCalledWith(expectedErr);
    });
  });
});
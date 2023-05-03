import { PaginationParams } from '../src/models/paginationParams';
import { fetchAllCourses, fetchCourse } from '../src/utils/fetchData';
import * as errorHandler from '../src/utils/handlerFetchError';
import keys from '../src/configs/dev.keys';

const TOKEN = process.env.TOKEN || keys.MOCK_TOKEN;

describe('fetchData', () => {
  const params: PaginationParams = { limit: '10', offset: '0' };
  const courseId = 'someId';

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('fetchAllCourses', () => {
    it('should return correct data params', async () => {
      const courses = [{}];
      const mockJson = jest.fn().mockReturnValue({ courses });
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ status: 200, json: mockJson } as unknown as Response));

      const response = await fetchAllCourses(params);

      expect(response.courses).toEqual(courses);
      expect(response.allCoursesLength).toEqual(1);
    });

    it('should return Error if fetch failed', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Test error')));
      const response = await fetchAllCourses(params);

      expect(response.error).toBeDefined();
    });

    it('should call throwAnErrorHandler function if fetch response status is NOT 200', async () => {
      const resp = { status: 500 };
      jest.spyOn(errorHandler, 'default');
      jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(resp as Response));

      await fetchAllCourses(params);

      expect(errorHandler.default).toHaveBeenCalledWith(resp, 'Fetch all courses failed.');
    });
  });

  describe('fetchCourse', () => {
    it('should return data and call fetch with correct params', async () => {
      const options = { headers: { Authorization: `Bearer ${TOKEN}` } };
      const course = {};
      const mockJson = jest.fn().mockReturnValue({ course });
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ status: 200, json: mockJson } as unknown as Response));

      const response = await fetchCourse(courseId);

      expect(response.course).toEqual(course);
      expect(global.fetch).toHaveBeenCalledWith('http://api.wisey.app/api/v1/core/preview-courses/' + courseId, options);
    });

    it('should return Error if fetch failed', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Test error')));

      const response = await fetchCourse(courseId);

      expect(response.error).toBeDefined();
    });

    it('should call throwAnErrorHandler function if fetch response status is NOT 200', async () => {
      const resp = { status: 500 };
      jest.spyOn(errorHandler, 'default');
      jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(resp as Response));

      await fetchCourse(courseId);

      expect(errorHandler.default).toHaveBeenCalledWith(resp, 'Fetch course failed.');
    });
  });
});

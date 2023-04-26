import { PaginationParams } from '../models/paginationParams';
import keys from '../configs/dev.keys';
import throwAnErrorHandler from './handlerFetchError';

const TOKEN = process.env.TOKEN || keys.MOCK_TOKEN;

export const fetchAllCourses = async ({ limit, offset }: PaginationParams) => {
	try {
		const resp = await fetch(
			'http://api.wisey.app/api/v1/core/preview-courses',
			{
				headers: {
					Authorization: `Bearer ${TOKEN}`,
				},
			}
		);
		if (resp.status !== 200) {
			throwAnErrorHandler(resp, 'Fetch all courses failed.');
		}
		const data = await resp.json();
		const courses = data.courses.slice(+offset, +limit);
		return { courses, allCoursesLength: data.courses.length };
	} catch (e) {
		return { error: e };
	}
};

export const fetchCourse = async (id: string) => {
	try {
		const resp = await fetch(
			'http://api.wisey.app/api/v1/core/preview-courses/' + id,
			{
				headers: {
					Authorization: `Bearer ${TOKEN}`,
				},
			}
		);
		if (resp.status !== 200) {
			throwAnErrorHandler(resp, 'Fetch course failed.');
		}
		const data = await resp.json();
		return data;
	} catch (e) {
		return { error: e };
	}
};

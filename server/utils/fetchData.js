const { MOCK_TOKEN } = require('../configs/dev.keys');
const throwAnErrorHandler = require('./handlerFetchError');

const TOKEN = process.env.TOKEN || MOCK_TOKEN;

module.exports = {
	fetchAllCourses: async ({ limit, offset }) => {
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
	},
	fetchCourse: async (id) => {
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
	},
};

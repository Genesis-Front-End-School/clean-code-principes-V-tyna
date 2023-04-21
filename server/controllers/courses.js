const { fetchAllCourses, fetchCourse } = require('../utils/fetchData');

module.exports = {
	getAllCourses: async (req, res, next) => {
		try {
			const response = await fetchAllCourses(req.query);
			if (response.error) {
				throw new Error(response.error);
			}
			const { courses, allCoursesLength } = response;
			return res.status(200).json({ courses, allCoursesLength });
		} catch (e) {
			next(e);
		}
	},
	getCourseById: async (req, res, next) => {
		try {
			const { courseId } = req.params;
			const course = await fetchCourse(courseId);
			if (course.error) {
				throw new Error(course.error);
			}
			return res.status(200).json(course);
		} catch (e) {
			next(e);
		}
	},
};

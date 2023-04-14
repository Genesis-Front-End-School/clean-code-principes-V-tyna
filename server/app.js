const express = require('express');
const cors = require('cors');
const { Router } = require('express');
const fetch = require('node-fetch');

const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzM3YjlhNS05ZTc5LTRlZTEtYWRmOC05ZDE5YmE1YzJjZGQiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3ODQ2OTMsImV4cCI6MTY3OTY4NDY5M30.jof6BupoFmpBmnxkfNHRJZJm7V7R8V8S0_e60ROgo34';

const app = express();
const router = Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res, next) => {
	try {
		const response = await fetchAllCourses(req.query);
		if (response.status) {
			return res.status(response.status).json(response);
		}
		const { courses, allCoursesLength } = response;
		return res.status(200).json({ courses, allCoursesLength });
	} catch (e) {
		console.error('Courses fetching failed.', e);
	}
});

router.get('/course/:courseId', async (req, res, next) => {
	try {
		const { courseId } = req.params;
		const course = await fetchCourse(courseId);
		if (course.error) {
			return res.status(course.error.status).json(course.error);
		}
		return res.status(200).json(course);
	} catch (e) {
		console.error('Courses fetching failed.', e);
	}
});

app.use(router);

app.use((req, res, next) => {
	if (req.method === 'OPTIONS') {
		res.status = 200;
		next();
	}
});

async function fetchAllCourses({ limit, offset }) {
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
			const e = new Error('Fetch all courses failed.');
			e.status = resp.status;
			e.statusText = resp.statusText;
			throw e;
		}
		const data = await resp.json();
		const courses = data.courses.slice(+offset, +limit);
		return { courses, allCoursesLength: data.courses.length };
	} catch (e) {
		const { message, status, statusText } = e;
		return { message, status, statusText };
	}
}

async function fetchCourse(id) {
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
			const e = new Error('Fetch course failed. Course id: ' + id);
			e.status = resp.status;
			e.statusText = resp.statusText;
			throw e;
		}
		const data = await resp.json();
		return data;
	} catch (e) {
		const { message, status, statusText } = e;
		return { error: { message, status, statusText } };
	}
}

async function getToken() {
	const resp = await fetch(
		'http://api.wisey.app/api/v1//auth/anonymous?platform=subscriptions'
	);
	const token = await resp.json();
	return token;
}

app.listen(3000, () => {
	console.log('Server is running at post 3000.');
});

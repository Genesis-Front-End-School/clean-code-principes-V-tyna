const express = require('express');
const cors = require('cors');
const coursesRouter = require('./routes/courses');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(coursesRouter);

app.use(errorHandler);

app.listen(3000, () => {
	console.log('Server is running at post 3000.');
});

import express from 'express';
import cors from 'cors';
import coursesRouter from './routes/courses';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(coursesRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running at post 3000.');
});

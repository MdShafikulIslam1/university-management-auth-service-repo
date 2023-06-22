import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/gobalErrorHandler';
import router from './app/routes/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
// import { generateStudentId } from './app/modules/user/user.utils';

// import ApiError from './error/ApiError'
const app: Application = express();

//middleware
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Application api
app.use('/api/v1/', router);
//global error handler
app.use(globalErrorHandler);
// handle not Found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found route',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
});
// const academicSemester = {
//   code: '01',
//   year: '2025',
// };
// const testId = async () => {
//   const id = await generateStudentId(academicSemester);
// };
// testId();
export default app;

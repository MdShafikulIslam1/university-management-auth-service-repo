import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateUser';
import { StudentValidation } from './student.validation';
const router = express.Router();
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);
router.get('/', StudentController.getAllStudents);
export const studentRoutes = router;

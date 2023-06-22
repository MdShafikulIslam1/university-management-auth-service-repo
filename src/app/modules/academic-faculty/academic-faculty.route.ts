import express from 'express';
import { AcademicFacultyController } from './academic-faculty.controller';
import validateRequest from '../../middlewares/validateUser';
import { AcademicFacultyZodValidation } from './academic-faculty.validation';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyZodValidation.academicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch('/:id', AcademicFacultyController.updateFaculty);
router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.get('/', AcademicFacultyController.getAllFaculty);
export const AcademicFacultyRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validateUser';
import { AcademicSemesterValidation } from './academic.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);
router.delete('/:id', AcademicSemesterController.deleteSemester);
router.get('/', AcademicSemesterController.getAllSemester);

export const AcademicSemesterRoutes = router;

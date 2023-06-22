import express from 'express';
import validateRequest from '../../middlewares/validateUser';
import { AcademicDepartmentController } from './academic-department.controller';
import { AcademicDepartmentZodValidation } from './academic-department.validation';
import Auth from '../../middlewares/Auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentZodValidation.createAcademicDepartmentZodSchema
  ),
  Auth(ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.createAcademicDepartment
);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentZodValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.get('/', AcademicDepartmentController.getAllDepartment);
export const AcademicDepartmentRoutes = router;

import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateUser';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createFaculty
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;

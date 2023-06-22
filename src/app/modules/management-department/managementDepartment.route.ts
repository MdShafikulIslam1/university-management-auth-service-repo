import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';
const router = express.Router();
router.post(
  '/create-managementDepartment',
  ManagementDepartmentController.createManagementDepartment
);
export const ManagementDepartmentRoutes = router;

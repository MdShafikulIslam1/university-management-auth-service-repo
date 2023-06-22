import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academic-semester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academic-faculty/academic-faculty.route';
import { AcademicDepartmentRoutes } from '../modules/academic-department/academic-department.route';
import { studentRoutes } from '../modules/student/student.route';
import { ManagementDepartmentRoutes } from '../modules/management-department/managementDepartment.route';
import { AuthRoutes } from '../modules/auth/auth.route';
const router = express.Router();

const modulesRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/management-department',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];
modulesRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/user', UserRoutes);
// router.use('/academicSemester', AcademicSemesterRoutes);

export default router;

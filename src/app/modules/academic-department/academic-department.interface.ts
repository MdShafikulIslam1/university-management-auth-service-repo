import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academic-faculty/academic-faculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  title?: string;
};

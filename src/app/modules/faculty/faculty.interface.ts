import { Types } from 'mongoose';
import { IAcademicFaculty } from '../academic-faculty/academic-faculty.interface';
import { IAcademicDepartment } from '../academic-department/academic-department.interface';

export type FacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type IFaculty = {
  id: string;
  name: FacultyName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  designation: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
};

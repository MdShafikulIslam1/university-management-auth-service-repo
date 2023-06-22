import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academic-faculty/academic-faculty.interface';
import { IAcademicDepartment } from '../academic-department/academic-department.interface';
import { IAcademicSemester } from '../academic-semester/academic-semester.interface';

type StudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};
type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// student interface
export type IStudent = {
  id: string;
  name: StudentName; //embedded object
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian; //embedded object
  localGuardian: LocalGuardian; //embedded object
  academicFaculty: Types.ObjectId | IAcademicFaculty; //reference _id
  academicDepartment: Types.ObjectId | IAcademicDepartment; //reference _id
  academicSemester: Types.ObjectId | IAcademicSemester; //reference _id
  profileImage?: string;
};

export type IStudentModel = Model<IStudent, Record<string, unknown>>;
export type IStudentFilters = {
  searchTerm?: string;
  name?: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  id?: string;
  contactNo?: string;
};

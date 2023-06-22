import { Types } from 'mongoose';
import { IManagementDepartment } from '../management-department/managementDepartment.interface';

export type AdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type IAdmin = {
  id: string;
  name: AdminName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
  profileImage?: string;
};

import { Schema, model } from 'mongoose';
import { IManagementDepartment } from './managementDepartment.interface';

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ManagementDepartment = model<IManagementDepartment>(
  'ManagementDepartment',
  managementDepartmentSchema
);

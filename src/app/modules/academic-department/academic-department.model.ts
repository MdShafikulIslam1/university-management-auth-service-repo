import { Schema, model } from 'mongoose';
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './academic-department.interface';

const academicDepartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty', //model name AcademicFaculty
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);

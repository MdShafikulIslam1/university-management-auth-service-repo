import { Schema, model } from 'mongoose';
import { IFaculty } from './faculty.interface';
import { bloodGroup, gender } from '../student/student.constant';

const facultySchema = new Schema<IFaculty>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String },
    },
    gender: { type: String, required: true, enum: gender },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroup },
    designation: { type: String, required: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
  },
  { timestamps: true }
);

const Faculty = model<IFaculty>('Faculty', facultySchema);

export default Faculty;

import { Schema, model } from 'mongoose';
import { IAdmin } from './admin.interface';
import { bloodGroup, gender } from '../student/student.constant';

const adminSchema = new Schema<IAdmin>(
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
    bloodGroup: { type: String, required: true, enum: bloodGroup },
    designation: { type: String, required: true },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },
    profileImage: { type: String },
  },
  { timestamps: true }
);

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;

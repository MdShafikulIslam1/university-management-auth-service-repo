import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import { AcademicSemester } from '../academic-semester/academic-semester.model';
import { IFaculty } from '../faculty/faculty.interface';
import Faculty from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import Admin from '../admin/admin.model';

const createStudent = async (
  studentData: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default student password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  //set up role
  user.role = 'student';
  //student Id
  const academicSemester = await AcademicSemester.findById(
    studentData.academicSemester
  );

  const session = await mongoose.startSession();
  let newUserAllData;
  try {
    session.startTransaction();
    const studentId = await generateStudentId(academicSemester);
    // console.log('user.service', studentId);
    user.id = studentId;
    studentData.id = studentId;
    // console.log('studentData', studentData);
    const newStudent = await Student.create([studentData], { session });
    if (!newStudent) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  //set default password if admin don't set password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  //set up role
  user.role = 'faculty';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const facultyId = await generateFacultyId();
    user.id = facultyId;
    faculty.id = facultyId;
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id })
      //nested populate
      .populate({
        path: 'faculty',
        populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }],
      });
  }
  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  //set default password if admin don't set password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  //set up role
  user.role = 'admin';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const adminId = await generateAdminId();
    user.id = adminId;
    admin.id = adminId;
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }
    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [{ path: 'managementDepartment' }],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};

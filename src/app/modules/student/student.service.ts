/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { studentSearchableFields } from './student.constant';
import { Student } from './student.model';
import { IStudent, IStudentFilters } from './student.interface';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  //search query
  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  //filters query
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Student.find(whereCondition)
    .populate('academicFaculty')
    .populate('academicSemester')
    .populate('academicDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };
  //dynamically handle the embedded name object during update
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Student.findOneAndUpdate(
    { id: id },
    updatedStudentData,
    {
      new: true,
    }
  );
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'The student not Found');
  }
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deletedStudent = await Student.findOneAndDelete({ id }, { session });
    if (!deleteStudent) {
      throw new ApiError(httpStatus.NOT_MODIFIED, 'Failed to delete Student');
    }
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

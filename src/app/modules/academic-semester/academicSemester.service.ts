import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academic-semester.interface';
import {
  academicSemesterSearchAbleFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { SortOrder } from 'mongoose';
import { AcademicSemester } from './academic-semester.model';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  // logic of Search Query
  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  //logic of filter query
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = paginationOptions;
  const skip = (page - 1) * limit;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  updatedData: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    updatedData.title &&
    updatedData.code &&
    academicSemesterTitleCodeMapper[updatedData.title] !== updatedData.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );
  return result;
};
const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};

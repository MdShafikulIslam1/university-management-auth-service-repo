import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './academic-faculty.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicFaculty } from './academic-faculty.interface';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(data);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'successfully created academic faculty',
      data: result,
    });
  }
);
const getAllFaculty = catchAsync(async (req, res) => {
  const filterOptions = pick(req.query, ['searchTerm', 'title']);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await AcademicFacultyService.getAllFaculty(
    filterOptions,
    paginationOptions
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully get academic faculty',
    data: result.data,
  });
});
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully created academic faculty',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, updatedData);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully updated academic faculty',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully delete academic faculty',
    data: result,
  });
});
export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};

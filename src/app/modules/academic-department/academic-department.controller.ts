import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { AcademicDepartmentService } from './academic-department.service';
import { IAcademicDepartment } from './academic-department.interface';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartment(
      data
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'successfully created academic Department',
      data: result,
    });
  }
);
const getAllDepartment = catchAsync(async (req, res) => {
  const filterOptions = pick(req.query, ['searchTerm', 'title']);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await AcademicDepartmentService.getAllDepartment(
    filterOptions,
    paginationOptions
  );
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully get academic Department',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully created academic Department',
    data: result,
  });
});
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully updated academic Department',
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully delete academic Department',
    data: result,
  });
});
export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};

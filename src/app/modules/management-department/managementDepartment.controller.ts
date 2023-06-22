import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ManagementDepartmentService } from './managementDepartment.service';
import { IManagementDepartment } from './managementDepartment.interface';

const createManagementDepartment = catchAsync(async (req, res) => {
  const managementDepartmentData = req.body;
  const result = await ManagementDepartmentService.createManagementDepartment(
    managementDepartmentData
  );
  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create ManagementDepartment',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createManagementDepartment,
};

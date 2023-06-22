import mongoose from 'mongoose';
import { IGenericErrorMessages } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';
import httpStatus from 'http-status';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = [
    {
      path: error?.path,
      message: 'Invalid Id',
    },
  ];
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Cast Error',
    errorMessages: errors,
  };
};
export default handleCastError;

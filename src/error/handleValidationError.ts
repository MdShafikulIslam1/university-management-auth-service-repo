import mongoose, { Error } from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessages } from '../interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = Object.values(err.errors).map(
    (el: Error.ValidatorError | Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  return {
    statusCode: 500,
    message: 'ValidationError',
    errorMessages: errors,
  };
};

export default handleValidationError;

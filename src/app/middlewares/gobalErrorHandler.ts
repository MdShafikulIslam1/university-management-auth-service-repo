/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessages } from '../../interfaces/error';
import handleValidationError from '../../error/handleValidationError';
import ApiError from '../../error/ApiError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../error/handleZodError';
import handleCastError from '../../error/handleCastError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log('globalErrorhandler', error)
    : errorLogger.error('global error ', error);
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessages[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};
export default globalErrorHandler;

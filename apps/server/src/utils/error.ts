import { NextFunction, Request, Response } from 'express';

type API_ERROR_CODE =
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL_SERVER_ERROR';

const API_ERROR_HTTP_CODE: Record<API_ERROR_CODE, number> = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const API_ERROR_MESSAGE: Record<API_ERROR_CODE, string> = {
  BAD_REQUEST: 'Bad request',
  NOT_FOUND: 'Not found',
  CONFLICT: 'Conflict',
  INTERNAL_SERVER_ERROR: 'Internal server error',
} as const;

export class APIError extends Error {
  public readonly code;
  public readonly statusCode;
  public readonly errorMessage;

  constructor({ code, message }: { code: API_ERROR_CODE; message: string }) {
    super(message);

    this.code = code;
    this.statusCode = API_ERROR_HTTP_CODE[code];
    this.errorMessage = API_ERROR_MESSAGE[code];
  }
}

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof APIError) {
    return response.status(error.statusCode).send({
      statusCode: error.statusCode,
      code: error.code,
      error: error.errorMessage,
      message: error.message,
    });
  }

  return response.status(API_ERROR_HTTP_CODE['INTERNAL_SERVER_ERROR']).send({
    statusCode: API_ERROR_HTTP_CODE['INTERNAL_SERVER_ERROR'],
    code: 'INTERNAL_SERVER_ERROR',
    error: API_ERROR_MESSAGE['INTERNAL_SERVER_ERROR'],
    message: 'Something went wrong',
  });
}

export function notFoundHandler(request: Request, response: Response) {
  return response.status(API_ERROR_HTTP_CODE['NOT_FOUND']).send({
    statusCode: API_ERROR_HTTP_CODE['NOT_FOUND'],
    code: 'NOT_FOUND',
    error: API_ERROR_MESSAGE['NOT_FOUND'],
    message: 'Resource not found',
  });
}

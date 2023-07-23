import { NextFunction, Request, Response } from 'express';

const HTTP_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 408,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const HTTP_ERROR_MESSAGES: Record<HTTP_TYPES, string> = {
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  TIMEOUT: 'Timeout',
  CONFLICT: 'Conflict',
  TOO_MANY_REQUESTS: 'Too many requests',
  INTERNAL_SERVER_ERROR: 'Internal server error',
} as const;

type HTTP_TYPES = keyof typeof HTTP_CODES;

export class HTTPError extends Error {
  public readonly code;
  public readonly statusCode;
  public readonly errorMessage;

  constructor({
    code,
    message = 'Something went wrong',
  }: {
    code: HTTP_TYPES;
    message?: string;
  }) {
    super(message);

    this.code = code;
    this.statusCode = HTTP_CODES[code];
    this.errorMessage = HTTP_ERROR_MESSAGES[code];
  }
}

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof HTTPError) {
    return response.status(error.statusCode).send({
      statusCode: error.statusCode,
      code: error.code,
      error: error.errorMessage,
      message: error.message,
    });
  }

  return response.status(HTTP_CODES['INTERNAL_SERVER_ERROR']).send({
    statusCode: HTTP_CODES['INTERNAL_SERVER_ERROR'],
    code: 'INTERNAL_SERVER_ERROR',
    error: HTTP_ERROR_MESSAGES['INTERNAL_SERVER_ERROR'],
    message: 'Something went wrong',
  });
}

export function notFoundHandler(request: Request, response: Response) {
  return response.status(HTTP_CODES['NOT_FOUND']).send({
    statusCode: HTTP_CODES['NOT_FOUND'],
    code: 'NOT_FOUND',
    error: HTTP_ERROR_MESSAGES['NOT_FOUND'],
    message: 'Resource not found',
  });
}

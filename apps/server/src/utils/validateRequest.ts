import { HTTPError } from '@/utils/error';
import type { Request, RequestHandler } from 'express';
import type { ZodError, ZodSchema } from 'zod';

export type ValidatedRequest<
  T extends {
    body?: any;
    params?: any;
    query?: any;
    files?: any;
  }
> = Request<T['params'], any, T['body'], T['query']>;

export function validateRequest<TParams, TQuery, TBody>(schemas: {
  params?: ZodSchema<TParams>;
  query?: ZodSchema<TQuery>;
  body?: ZodSchema<TBody>;
}): RequestHandler<TParams, any, TBody, TQuery> {
  return (req, res, next) => {
    const errorList = Array<ZodError>();

    const { body, params, query } = schemas;

    if (body) {
      const parsed = body.safeParse(req.body);

      if (parsed.success) {
        req.body = parsed.data;
      } else {
        errorList.push(parsed.error);
      }
    }

    if (query) {
      const parsed = query.safeParse(req.query);

      if (parsed.success) {
        req.query = parsed.data;
      } else {
        errorList.push(parsed.error);
      }
    }

    if (params) {
      const parsed = params.safeParse(req.params);

      if (parsed.success) {
        req.params = parsed.data;
      } else {
        errorList.push(parsed.error);
      }
    }

    if (errorList.length >= 1) {
      throw new HTTPError({
        code: 'BAD_REQUEST',
        message: zodErrorsToString(errorList),
      });
    }

    return next();
  };
}

function zodErrorsToString(errors: Array<ZodError>) {
  const issues = errors.map((error) => error.issues).flat();
  const message = issues.map((issue) => issue.message).join(', ');

  return message;
}

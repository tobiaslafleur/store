import { RequestHandler } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validateRequest: <TParams, TQuery, TBody>(schemas: {
  params?: ZodSchema<TParams>;
  query?: ZodSchema<TQuery>;
  body?: ZodSchema<TBody>;
}) => RequestHandler<TParams, any, TBody, TQuery> =
  ({ body, query, params }) =>
  (req, res, next) => {
    const errorList = Array<ZodError>();

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
      throw new Error(errorsToString(errorList));
    }

    return next();
  };

const errorsToString = (errors: Array<ZodError>) => {
  const issues = errors.map((error) => error.issues).flat();
  const message = issues.map((issue) => issue.message).join(', ');

  return message;
};

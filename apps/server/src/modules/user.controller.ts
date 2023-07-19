import { NextFunction, Response } from 'express';
import { ValidatedRequest } from '@store/types';
import { CreateUserInput, GetUserInput } from '@/modules/user.schema';
import { createUser, getUserById } from '@/modules/user.service';
import { APIError } from '@/utils/error';
import { validate } from 'uuid';

export async function createUserHandler(
  request: ValidatedRequest<{ body: CreateUserInput }>,
  response: Response,
  next: NextFunction
) {
  try {
    const user = await createUser(request.body);

    const { password, confirm_password, ...rest } = user;

    response.status(201).send({ ...rest });
  } catch (error: any) {
    if (error instanceof APIError) {
      return next(error);
    }

    return next(
      new APIError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      })
    );
  }
}

export async function getUserHandler(
  request: ValidatedRequest<{ params: GetUserInput }>,
  response: Response,
  next: NextFunction
) {
  try {
    const validUUID = validate(request.params.id);

    if (!validUUID) {
      throw new APIError({
        code: 'BAD_REQUEST',
        message: 'Id is not a valid UUID',
      });
    }

    const user = await getUserById(request.params.id);

    if (!user) {
      throw new APIError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    const { password, ...rest } = user;

    response.status(200).send({ ...rest });
  } catch (error) {
    if (error instanceof APIError) {
      return next(error);
    }

    return next(
      new APIError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      })
    );
  }
}

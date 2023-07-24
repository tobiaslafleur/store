import { createUser, getMultipleUsers } from '@/models/users/users.service';
import { CreateUserRequest, GetMultipleUsers } from './users.schema';
import { ValidatedRequest } from '@/utils/validateRequest';
import { NextFunction, Response } from 'express';
import { HTTPError } from '@/utils/error';
import { randomUUID } from 'crypto';
import argon2 from 'argon2';

export async function createUserHandler(
  request: ValidatedRequest<{ body: CreateUserRequest }>,
  response: Response,
  next: NextFunction
) {
  try {
    const { confirm_password, ...input } = request.body;

    // TODO: Look at options for argon2
    input.password = await argon2.hash(input.password);

    const user = await createUser({
      ...input,
      uuid: randomUUID(),
    });

    return response.status(201).send(user);
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      return next(error);
    }

    return next(
      new HTTPError({
        code: 'INTERNAL_SERVER_ERROR',
      })
    );
  }
}

export async function getMultipleUsersHandler(
  request: ValidatedRequest<{ query: GetMultipleUsers }>,
  response: Response,
  next: NextFunction
) {
  try {
    const userList = await getMultipleUsers(request.query);

    return response.status(200).send(userList);
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      return next(error);
    }

    return next(
      new HTTPError({
        code: 'INTERNAL_SERVER_ERROR',
      })
    );
  }
}

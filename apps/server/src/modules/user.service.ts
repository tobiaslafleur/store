import * as db from '@/db';
import { getQueryString } from '@/db/utils';
import { APIError } from '@/utils/error';
import { PartialUser, User } from '@store/types';
import { v4 as uuidv4, validate } from 'uuid';

export async function createUser(data: PartialUser) {
  const insertedId = uuidv4();

  const res = await db.query<{ count: number }>({
    sql: getQueryString({ folderPath: 'user', fileName: 'checkIfUserExists' }),
    values: [data.email],
  });

  if (res[0].count > 0) {
    throw new APIError({
      code: 'CONFLICT',
      message: 'Email is already in use',
    });
  }

  await db.query({
    sql: getQueryString({ folderPath: 'user', fileName: 'createUser' }),
    values: [
      insertedId,
      data.email,
      data.first_name,
      data.last_name,
      data.password,
      data.role,
      data.email,
    ],
  });

  return {
    id: insertedId,
    ...data,
  };
}

export async function getUserById(id: string) {
  const validUUID = validate(id);

  if (!validUUID) {
    throw new APIError({
      code: 'BAD_REQUEST',
      message: 'Id is not a valid UUID',
    });
  }

  const user = await db.query<User>({
    sql: getQueryString({ folderPath: 'user', fileName: 'getUserById' }),
    values: [id],
  });

  return user[0];
}

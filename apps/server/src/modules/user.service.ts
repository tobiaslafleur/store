import * as db from '@/db';
import { loadQuery } from '@/db/loadQuery';
import { CreateUserInput } from '@/modules/user.schema';
import { APIError } from '@/utils/error';
import { User } from '@store/types';
import { v4 as uuidv4, validate } from 'uuid';

export async function createUser(data: CreateUserInput) {
  const insertedId = uuidv4();

  const res = await db.query<{ email: string }, User>({
    sql: loadQuery('user', 'getUserByEmail'),
    values: { email: data.email },
  });

  if (res[0]) {
    throw new APIError({
      code: 'CONFLICT',
      message: 'Email is already in use',
    });
  }

  await db.query<User>({
    sql: loadQuery('user', 'createUser'),
    values: { id: insertedId, ...data },
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

  const user = await db.query<{ id: string }, User>({
    sql: loadQuery('user', 'getUserByEmail'),
    values: { id },
  });

  return user[0];
}

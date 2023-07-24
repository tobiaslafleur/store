import { CreateUser } from '@/models/users/users.schema';
import db from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { HTTPError } from '@/utils/error';

export async function createUser(input: CreateUser) {
  const userExists = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, input.email));

  if (userExists.length > 0) {
    throw new HTTPError({
      code: 'CONFLICT',
      message: 'Email is already in use',
    });
  }

  const insertResult = await db.insert(usersTable).values(input);

  const user = await db
    .select({
      id: usersTable.uuid,
      email: usersTable.email,
      first_name: usersTable.first_name,
      last_name: usersTable.last_name,
      created_at: usersTable.created_at,
      updated_at: usersTable.updated_at,
    })
    .from(usersTable)
    .where(eq(usersTable.id, insertResult[0].insertId));

  return user[0];
}

export async function getMultipleUsers({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const userList = await db
    .select({
      id: usersTable.uuid,
      email: usersTable.email,
      first_name: usersTable.first_name,
      last_name: usersTable.last_name,
      created_at: usersTable.created_at,
      updated_at: usersTable.updated_at,
    })
    .from(usersTable)
    .limit(limit)
    .offset(limit * offset)
    .orderBy(usersTable.id);

  return userList;
}

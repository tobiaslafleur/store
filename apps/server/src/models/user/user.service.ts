import { CreateUser } from '@/models/user/user.schema';
import db from '@/db';
import { userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { HTTPError } from '@/utils/error';

export async function createUser(input: CreateUser) {
  const userExists = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, input.email));

  if (userExists.length > 0) {
    throw new HTTPError({
      code: 'CONFLICT',
      message: 'Email is already in use',
    });
  }

  const insertResult = await db.insert(userTable).values(input);

  const user = await db
    .select({
      id: userTable.uuid,
      email: userTable.email,
      first_name: userTable.first_name,
      last_name: userTable.last_name,
      created_at: userTable.created_at,
      updated_at: userTable.updated_at,
    })
    .from(userTable)
    .where(eq(userTable.id, insertResult[0].insertId));

  return user[0];
}

export async function getMultipleUsers({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) {
  const userList = await db
    .select({
      id: userTable.uuid,
      email: userTable.email,
      first_name: userTable.first_name,
      last_name: userTable.last_name,
      created_at: userTable.created_at,
      updated_at: userTable.updated_at,
    })
    .from(userTable)
    .limit(limit)
    .offset(limit * page)
    .orderBy(userTable.id);

  return userList;
}

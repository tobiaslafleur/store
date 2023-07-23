import { createUserType } from '@/models/user/user.schema';
import db from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { HTTPError } from '@/utils/error';

export async function createUser(input: createUserType) {
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email));

  if (userExists.length > 0) {
    throw new HTTPError({
      code: 'CONFLICT',
      message: 'Email is already in use',
    });
  }

  const insertResult = await db.insert(users).values(input);

  const user = await db
    .select({
      id: users.uuid,
      email: users.email,
      first_name: users.first_name,
      last_name: users.last_name,
      created_at: users.created_at,
      updated_at: users.updated_at,
    })
    .from(users)
    .where(eq(users.id, insertResult[0].insertId));

  return user;
}

import { prisma } from '@/utils/db';
import { toUUIDFromBinary } from '@/utils/uuid';
import { Prisma } from '@prisma/client';

export async function createUser(input: Prisma.usersCreateInput) {
  const user = await prisma.users
    .create({
      data: input,
      select: {
        uuid: true,
        email: true,
        first_name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
      },
    })
    .then(({ uuid, ...rest }) => ({ id: toUUIDFromBinary(uuid), ...rest }));

  return user;
}

export async function getMultipleUsers({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const users = await prisma.users
    .findMany({
      take: limit,
      skip: limit * offset,
      select: {
        uuid: true,
        email: true,
        first_name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
      },
    })
    .then((users) =>
      users.map(({ uuid, ...rest }) => ({
        id: toUUIDFromBinary(uuid),
        ...rest,
      }))
    );

  return users;
}

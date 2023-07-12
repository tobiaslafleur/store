import fs from 'fs';
import path from 'path';

type Queries = {
  user: {
    createUser: 'createUser';
    getUserByEmail: 'getUserByEmail';
    getUserById: 'getUserById';
    checkIfUserExists: 'checkIfUserExists';
  };
};

export function loadQuery<T extends keyof Queries>(
  folder: T,
  file: keyof Queries[T] & string
) {
  const sql = fs
    .readFileSync(
      path.resolve(__dirname, `./queries/${folder}/${file}.sql`),
      'utf-8'
    )
    .replace(/[\r\n]+/g, ' ');

  return sql;
}

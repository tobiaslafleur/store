import fs from 'fs';
import path from 'path';
import { Queries, SQLFiles } from '@/db/files';

export function getQueryString(fileName: Queries) {
  const file = fs
    .readFileSync(
      path.resolve(__dirname, `./queries/${SQLFiles[fileName]}.sql`),
      'utf-8'
    )
    .replace(/[\r\n]+/g, ' ');

  return file;
}

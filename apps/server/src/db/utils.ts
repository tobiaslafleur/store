import fs from 'fs';
import path from 'path';
import { Paths, Queries, SQLFiles } from '@/db/files';

export function getQueryString({
  folderPath,
  fileName,
}: {
  folderPath?: Paths;
  fileName: Queries;
}) {
  let file = '';

  if (!folderPath) {
    file = fs
      .readFileSync(
        path.resolve(__dirname, `./queries/${SQLFiles[fileName]}.sql`),
        'utf-8'
      )
      .replace(/[\r\n]+/g, ' ');
  } else {
    file = fs
      .readFileSync(
        path.resolve(
          __dirname,
          `./queries/${folderPath}/${SQLFiles[fileName]}.sql`
        ),
        'utf-8'
      )
      .replace(/[\r\n]+/g, ' ');
  }

  return file;
}

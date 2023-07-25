import { HTTPError } from '@/utils/error';
import { default as Multer, diskStorage } from 'multer';

const storage = diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (request, file, cb) => {
    // TODO: Add random filenames to avoid duplicates
    cb(null, file.originalname);
  },
});

export const multer = Multer({ storage });

export function validateMulter<
  T,
  R = T extends string[]
    ? { [key in T[number]]: Express.Multer.File[] }
    : Express.Multer.File[]
>({
  files,
}: {
  files:
    | { [key: string]: Express.Multer.File[] }
    | Express.Multer.File[]
    | undefined;
}): R {
  if (!files) {
    throw new HTTPError({
      code: 'BAD_REQUEST',
      message: 'images are required on request.files',
    });
  }

  if (Array.isArray(files)) {
    return files as R;
  }

  return files as R;
}

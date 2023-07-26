import { HTTPError } from '@/utils/error';
import { default as Multer, diskStorage } from 'multer';

const storage = diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'images/');
  },
  filename: (request, file, cb) => {
    // TODO: Add random filenames to avoid duplicates
    cb(null, file.originalname);
  },
});

export const multer = Multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

// TODO: refactor to allow specification of how many images?
export function validateMulter<
  T,
  R = T extends string[]
    ? { [key in T[number]]: Express.Multer.File[] }
    : Express.Multer.File[]
>(
  files:
    | { [key: string]: Express.Multer.File[] }
    | Express.Multer.File[]
    | undefined
): R {
  if (!files) {
    throw new HTTPError({
      code: 'BAD_REQUEST',
      message: 'images are required on request.files',
    });
  }

  if (Array.isArray(files)) {
    return files as R;
  }

  //TODO: Ensure that keys exists on files object else error (maybe optional field???)

  return files as R;
}

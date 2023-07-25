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

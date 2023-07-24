import { default as Multer, diskStorage } from 'multer';

const storage = diskStorage({
  destination: function (request, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (request, file, cb) {
    // TODO: Add random filenames to avoid duplicates
    cb(null, file.originalname);
  },
});

export const multer = Multer({ storage });

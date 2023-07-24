import express, { Express } from 'express';
import cors from 'cors';
import { pino } from '@/utils/logger';
import routeHandler from '@/routes';
import { errorHandler, notFoundHandler } from '@/utils/error';
import { multer } from '@/utils/multer';

export default function initializeServer(): Express {
  const app = express();

  app.use(pino);

  app.use(express.json());
  app.use(cors());

  app.use('/api/v1', routeHandler);

  app.post('/upload', multer.single('fileUpload'), async function (req, res) {
    console.log(req.file);

    return res.send();
  });

  app.use(errorHandler);
  app.use(notFoundHandler);

  return app;
}

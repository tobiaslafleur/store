import express, { Express } from 'express';
import cors from 'cors';
import { pino } from '@/utils/logger';
import { errorHandler, notFoundHandler } from '@/utils/error';

export default function initializeServer(): Express {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(pino);

  app.use(errorHandler);
  app.use(notFoundHandler);

  return app;
}

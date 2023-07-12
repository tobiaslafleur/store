import express, { Express } from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from '@/utils/error';
import routeHandler from '@/routes';

export function buildServer(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/v1', routeHandler);

  app.use(errorHandler);
  app.use(notFoundHandler);

  return app;
}

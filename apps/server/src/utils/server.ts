import express, { Express } from 'express';
import cors from 'cors';
import { pino } from '@/utils/logger';

export default function initializeServer(): Express {
  const app = express();

  app.use(express.json());
  app.use(cors);

  app.use(pino);

  return app;
}

import express, { Express } from 'express';
import cors from 'cors';

export default function initializeServer(): Express {
  const app = express();

  app.use(express.json());
  app.use(cors);

  return app;
}

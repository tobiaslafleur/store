import express, { Express } from 'express';
import cors from 'cors';
import { validateRequest } from '@/utils/validateRequest';
import { z } from 'zod';

export const buildServer: () => Express = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.post(
    '/',
    validateRequest({
      body: z.object({
        name: z.string({ invalid_type_error: 'name must be a string' }),
        age: z.number({ invalid_type_error: 'age must be a number' }),
      }),
    }),
    (req, res) => {
      return res.status(200).send(req.body);
    }
  );

  return app;
};

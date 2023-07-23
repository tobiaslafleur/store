import { createUserHandler } from '@/models/user/user.controller';
import { createUserSchema } from '@/models/user/user.schema';
import { validateRequest } from '@/utils/validateRequest';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/',
  validateRequest({ body: createUserSchema }),
  createUserHandler
);

export default router;

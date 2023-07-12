import { createUserHandler, getUserHandler } from '@/modules/user.controller';
import { createUserSchema, getUserSchema } from '@/modules/user.schema';
import { validateRequest } from '@/utils/validateRequest';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/',
  validateRequest({ body: createUserSchema }),
  createUserHandler
);

router.get('/:id', validateRequest({ params: getUserSchema }), getUserHandler);

export default router;

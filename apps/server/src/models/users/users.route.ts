import {
  createUserHandler,
  getMultipleUsersHandler,
} from '@/models/users/users.controller';
import {
  createUserSchema,
  getMultipleUsersSchema,
} from '@/models/users/users.schema';
import { validateRequest } from '@/utils/validateRequest';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/',
  validateRequest({ body: createUserSchema }),
  createUserHandler
);

router.get(
  '/',
  validateRequest({ query: getMultipleUsersSchema }),
  getMultipleUsersHandler
);

export default router;

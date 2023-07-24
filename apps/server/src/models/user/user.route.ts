import {
  createUserHandler,
  getMultipleUsersHandler,
} from '@/models/user/user.controller';
import {
  createUserSchema,
  getMultipleUsersSchema,
} from '@/models/user/user.schema';
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

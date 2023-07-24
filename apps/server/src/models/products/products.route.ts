import {
  createProductHandler,
  getMultipleProductsHandler,
} from '@/models/products/products.controller';
import {
  createProductSchema,
  getMultipleProductsSchema,
} from '@/models/products/products.schema';
import { validateRequest } from '@/utils/validateRequest';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/',
  validateRequest({ body: createProductSchema }),
  createProductHandler
);

router.get(
  '/',
  validateRequest({ query: getMultipleProductsSchema }),
  getMultipleProductsHandler
);

export default router;

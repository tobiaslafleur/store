import {
  createProductHandler,
  getMultipleProductsHandler,
} from '@/models/products/products.controller';
import {
  createProductSchema,
  getMultipleProductsSchema,
} from '@/models/products/products.schema';
import { multer } from '@/utils/multer';
import { validateRequest } from '@/utils/validateRequest';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/',
  multer.fields([
    { name: 'product_image', maxCount: 1 },
    { name: 'image_gallery', maxCount: 10 },
  ]),
  validateRequest({ body: createProductSchema }),
  createProductHandler
);

router.get(
  '/',
  validateRequest({ query: getMultipleProductsSchema }),
  getMultipleProductsHandler
);

export default router;

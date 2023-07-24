import { Router } from 'express';
import userRouteHandler from '@/models/users/users.route';
import productRouteHandler from '@/models/products/products.route';

const router: Router = Router();

router.use('/healthcheck', function (request, response, next) {
  // TODO: Add healthchecks on database
  return response.status(200).send({ status: 'available' });
});

router.use('/users', userRouteHandler);

router.use('/products', productRouteHandler);

export default router;

import { Router } from 'express';
import userRouteHandler from '@/models/user/user.route';

const router: Router = Router();

router.use('/healthcheck', function (request, response, next) {
  // TODO: Add healthchecks on database
  return response.status(200).send({ status: 'available' });
});

router.use('/user', userRouteHandler);

export default router;

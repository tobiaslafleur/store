import { Router } from 'express';

const router: Router = Router();

router.use('/healthcheck', function (request, response, next) {
  // TODO: Add healthchecks on database
  return response.status(200).send({ status: 'available' });
});

export default router;

import { Router } from 'express';
import userHandler from '@/modules/user.route';

const router: Router = Router();

router.use('/user', userHandler);

export default router;

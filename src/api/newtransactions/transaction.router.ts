import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';
import { add } from './transaction.controller';

const router = Router();
router.use(isAuthenticated);
router.post('', add);

export default router;

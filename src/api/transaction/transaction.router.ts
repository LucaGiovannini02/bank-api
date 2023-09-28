import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';
import { createBankTransfer } from './transaction.controller';

const router = Router();
router.use(isAuthenticated);
router.post('', createBankTransfer);

export default router;

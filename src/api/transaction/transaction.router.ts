import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';
import {
  createBankTransfer,
  getTransactionById,
} from './transaction.controller';

const router = Router();
router.use(isAuthenticated);
router.post('/bank-transfer', createBankTransfer);
router.get('', getTransactionById);

export default router;

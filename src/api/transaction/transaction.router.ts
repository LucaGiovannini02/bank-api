import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';

import {
  createBankTransfer,
  phoneRecharge,
  getTransactionDetails,
  getTransactionsWithFilters,
  getAccountBalance,
} from './transaction.controller';

const router = Router();
router.use(isAuthenticated);
router.post('/bank-transfer', createBankTransfer);
router.post('/phone-recharge', phoneRecharge);

router.get('/balance', getAccountBalance);

router.get('/transactions/:transactionId', getTransactionDetails);
router.get('', getTransactionsWithFilters);

export default router;

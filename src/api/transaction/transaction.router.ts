import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';

import {
  createBankTransfer,
  phoneRecharge,
  getTransactionDetails,
  getTransactionsByBankAccount,
  getTransactionsWithFilters,
  getAccountBalance,
} from './transaction.controller';

const router = Router();
router.use(isAuthenticated);
router.post('/bank-transfer', createBankTransfer);
router.post('/phone-recharge', phoneRecharge);

router.get('/:bankAccountId', getTransactionsByBankAccount);
router.get('/:bankAccountId/:transactionId', getTransactionDetails);
router.get('/:bankAccountId', getTransactionsWithFilters);
router.get('/:bankAccountId/balance', getAccountBalance);

export default router;

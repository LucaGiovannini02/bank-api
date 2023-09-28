import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';

import {
  createBankTransfer,
  phoneRecharge,
  getTransactionDetails,
  getTransactionsByBankAccount,
  getTransactionsWithFilters,
} from './transaction.controller';

const router = Router();
router.use(isAuthenticated);
router.post('/bank-transfer', createBankTransfer);
router.post('/phone-recharge', phoneRecharge);
//router.get('', getTransactionById);

router.get('/:bankAccountId', getTransactionsByBankAccount);
router.get('/:bankAccountId/:transactionId', getTransactionDetails);
router.get('/:bankAccountId', getTransactionsWithFilters);

export default router;

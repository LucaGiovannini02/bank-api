import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';
import {
  createBankTransfer,
  getTransactionDetails,
  getTransactionsByBankAccount,
  getTransactionsWithFilters,
} from './transaction.controller';

const router = Router();
router.use(isAuthenticated);
router.post('/bank-transfer', createBankTransfer);

router.get('/:bankAccountId', getTransactionsByBankAccount);
router.get('/:bankAccountId/:transactionId', getTransactionDetails);
router.get('/:bankAccountId', getTransactionsWithFilters);

export default router;

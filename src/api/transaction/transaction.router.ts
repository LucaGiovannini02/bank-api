import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';

import {
  createBankTransfer,
  phoneRecharge,
  getTransactionDetails,
  getTransactionsWithFilters,
  getAccountBalance,
} from './transaction.controller';
import { validate } from '../../utils/validation.middleware';
import { QueryTransactionsDTO } from './transaction.dto';

const router = Router();
router.use(isAuthenticated);
router.post('/bank-transfer', createBankTransfer);
router.post('/phone-recharge', phoneRecharge);

router.get('/balance', getAccountBalance);

router.get('/:transactionId', getTransactionDetails);
router.get(
  '',
  validate(QueryTransactionsDTO, 'query'),
  getTransactionsWithFilters
);

export default router;

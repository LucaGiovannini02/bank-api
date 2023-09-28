import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';
import { createBankTransfer, phoneRecharge, } from './transaction.controller';

const router = Router();
router.use(isAuthenticated);
router.post('/bank-transfer', createBankTransfer);
router.post('/phone-recharge', phoneRecharge);
//router.get('', getTransactionById);

export default router;

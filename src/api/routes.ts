import { Router } from 'express';
import authRouter from './auth/auth.router';
import transactionRouter from './transactions/transaction.router';

const router = Router();

router.use('/operations', transactionRouter);
router.use('/transactions', transactionRouter);
router.use(authRouter);
export default router;

import { Router } from 'express';
import authRouter from './auth/auth.router';
import transactionRouter from './transaction/transaction.router';
import logRouter from './log/log.router';


const router = Router();

router.use('/transactions', transactionRouter);
router.use(authRouter);
router.use('/log', logRouter);
export default router;
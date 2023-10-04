import { Router } from 'express';
import authRouter from './auth/auth.router';
import transactionRouter from './transaction/transaction.router';
import logRouter from './log/log.router';
import usersRouter from './user/user.router';

const router = Router();

router.use('/operations', transactionRouter);
router.use('/transactions', transactionRouter);
router.use(authRouter);
router.use('/log', logRouter);
router.use('/users', usersRouter);
export default router;
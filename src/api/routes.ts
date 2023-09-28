import { Router } from 'express';
import authRouter from './auth/auth.router';
import transactionRouter from './transaction/transaction.router';
import logRouter from './log/log.router';

const router = Router();

<<<<<<< HEAD
=======
router.use('/operations', transactionRouter);
router.use('/transactions', transactionRouter);
>>>>>>> f8980605da38f655946263595023235c0d34455f
router.use(authRouter);
router.use('/log', logRouter);
export default router;
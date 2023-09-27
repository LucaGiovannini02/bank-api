import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';
import { validate } from '../../utils/validation.middleware';
import { CreateTransactionDTO, UpdateTransactionDTO } from './transaction.dto';
import { create } from './transaction.controller';

const router = Router();

router.use(isAuthenticated);
router.get('');
router.post('/transactions', validate(CreateTransactionDTO), create);
router.patch('/:id', validate(UpdateTransactionDTO));
router.delete('/:id');

export default router;

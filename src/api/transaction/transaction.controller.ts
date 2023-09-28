import { NextFunction, Request, Response } from 'express';
import { Transaction as iTransaction } from './transaction.entity';
import TransactionService from './transaction.service';
<<<<<<< HEAD
=======
import { BankAccount } from '../bank-account/bank-account.model';
import { Transaction } from './transaction.model';
>>>>>>> f8980605da38f655946263595023235c0d34455f

export const createBankTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { senderIBAN, receiverIBAN, amount } = req.body;

    // Assuming you have a createTransaction method in your service
    const transaction: iTransaction[] = await TransactionService.bankTransfer(
      senderIBAN,
      receiverIBAN,
      amount
    );

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

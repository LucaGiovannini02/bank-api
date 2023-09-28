import { NextFunction, Request, Response } from 'express';
import { Transaction as iTransaction } from './transaction.entity';
import TransactionService from './transaction.service';
import logService from '../log/log.service';

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

export const phoneRecharge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, senderIban, amount, userId } = req.body;
    // Assuming you have a createTransaction method in your service
    const phoneRecharge: iTransaction[] =
      await TransactionService.phoneRecharge(phoneNumber, senderIban, amount);
    logService.addPhoneLog(userId, req.ip, true);
    res.status(201).json(phoneRecharge);
  } catch (error) {
    next(error);
  }
};

export const getTransactionsByBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bankAccountId } = req.params;
    const transactions = await TransactionService.getTransactionsByBankAccount(
      bankAccountId
    );
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactionDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bankAccountId, transactionId } = req.params;

    const transaction = await TransactionService.getTransactionDetails(
      bankAccountId,
      transactionId
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const getTransactionsWithFilters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bankAccountId } = req.params;

    const transactions = await TransactionService.getTransactionsWithFilters(
      bankAccountId,
      req.query
    );

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getAccountBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bankAccountId } = req.params;

    // Call the service method to get the balance
    const balance = await TransactionService.getBalance(bankAccountId);

    if (balance === null) {
      return res
        .status(404)
        .json({ message: 'No operations found for this bank account' });
    }

    res.status(200).json({ balance });
  } catch (error) {
    next(error);
  }
};

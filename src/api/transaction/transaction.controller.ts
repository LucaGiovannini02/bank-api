import { NextFunction, Request, Response } from 'express';
import { Transaction as iTransaction } from './transaction.entity';
import TransactionService from './transaction.service';
import logService from '../log/log.service';
import { BankAccount } from '../bank-account/bank-account.model';
import bankAccountService from '../bank-account/bank-account.service';

export const createBankTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bankAccount = await bankAccountService.getByUser(req.user!.id!);

    const { receiverIBAN, amount } = req.body;

    // Assuming you have a createTransaction method in your service
    const transaction: iTransaction[] = await TransactionService.bankTransfer(
      bankAccount?.iban!,
      receiverIBAN,
      amount
    );
    await logService.addBankTransferLog(req.user?.id!, req.ip, true);
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
    const { phoneNumber, amount } = req.body;
    const bankAccount = await bankAccountService.getByUser(req.user!.id!);

    const phoneRecharge: iTransaction = await TransactionService.phoneRecharge(
      phoneNumber,
      bankAccount?.id,
      amount
    );
    await logService.addPhoneLog(req.user?.id!, req.ip, true);
    res.status(201).json(phoneRecharge);
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
    const { transactionId } = req.params;
    const bankAccount = await bankAccountService.getByUser(req.user!.id!);

    const transaction = await TransactionService.getTransactionDetails(
      bankAccount!.id,
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
    const bankAccount = await bankAccountService.getByUser(req.user!.id!);

    const transactions = await TransactionService.getTransactionsWithFilters(
      bankAccount!.id,
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
    const bankAccount = await bankAccountService.getByUser(req.user!.id!);

    // Call the service method to get the balance
    const balance = await TransactionService.getBalance(bankAccount!.id);

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

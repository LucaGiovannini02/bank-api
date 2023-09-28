import { NextFunction, Request, Response } from 'express';
import { Transaction as iTransaction } from './transaction.entity';
import TransactionService from './transaction.service';
import logService from '../log/log.service';
import { BankAccount } from '../bank-account/bank-account.model';

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
    const senderAccount = await BankAccount.findOne({ iban: senderIBAN });
    let userId = senderAccount?.user?.toString();
    if(userId == undefined){ userId = "null" };
    await logService.addBankTransferLog(userId, req.ip, true);
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
    const { phoneNumber, senderIban, amount } = req.body;
    // Assuming you have a createTransaction method in your service
    const phoneRecharge: iTransaction[] = await TransactionService.phoneRecharge(
      phoneNumber,
      senderIban,
      amount,
    );
    const senderAccount = await BankAccount.findOne({ iban: senderIban });
    let userId = senderAccount?.user?.toString();
    if(userId == undefined){ userId = "null" };
    await logService.addPhoneLog(userId, req.ip, true);
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

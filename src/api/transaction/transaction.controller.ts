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
    const phoneRecharge: iTransaction[] = await TransactionService.phoneRecharge(
      phoneNumber,
      senderIban,
      amount,
    );
    logService.addPhoneLog(userId, req.ip, true);
    res.status(201).json(phoneRecharge);
  } catch (error) {
    next(error);
  }
};

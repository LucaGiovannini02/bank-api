import { NextFunction, Request, Response } from 'express';
import TransactionService from './transaction.service';
import { async } from 'rxjs';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, description, senderAccountId, recipientAccountId } =
      req.body;

    const createdTransaction = await TransactionService.createTransaction(
      amount,
      description,
      senderAccountId,
      recipientAccountId
    );

    return res.status(201).json(createdTransaction);
  } catch (error) {
    return res.status(500).json(error);
  }
};

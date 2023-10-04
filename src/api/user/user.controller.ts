import { NextFunction, Response, Request } from "express";
import { User } from './user.model';
import { BankAccount } from "../bank-account/bank-account.model";

export let usersList = async (req: Request, res: Response, next: NextFunction) => {
  let usersList = await User.find();
  res.json(usersList);
}

export let me = async (req: Request, res: Response, next: NextFunction) => {
  const bankAccount = await BankAccount.findOne({ user: req.user.id });
  const user = await User.findOne({ _id: req.user.id });
  res.json({iban: bankAccount.iban, user});
}
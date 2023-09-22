import { Types } from 'mongoose';
import { BankAccount } from '../bank-account/bank-account.entity';
import { Category } from '../category/category.entity';

export interface Transaction {
  id?: string;
  amount: number;
  balance: number;
  date: Date;
  bankAccount: BankAccount | Types.ObjectId | string;
  transactionCategory: Category | Types.ObjectId | string;
}

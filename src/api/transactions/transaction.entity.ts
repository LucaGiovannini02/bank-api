import { Types } from 'mongoose';
import { BankAccount as iBankAccount } from '../bank-account/bank-account.entity';
import { Category as iCategory } from '../category/category.entity';

export interface Transaction {
  id?: string;
  amount: number;
  balance?: number;
  date?: Date;
  description?: string;
  sender?: iBankAccount | Types.ObjectId;
  receiver?: iBankAccount | Types.ObjectId;
  transactionCategory?: iCategory | Types.ObjectId;
  bankAccountID?: iBankAccount | Types.ObjectId;
}

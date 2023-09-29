import { Types } from 'mongoose';
import { BankAccount as iBankAccount } from '../bank-account/bank-account.entity';
import { Category as iCategory } from '../category/category.entity';

export interface Transaction {
  id?: string;
  amount: number;
  balance?: number;
  phoneNumber?: string;
  date?: Date;
  description?: string;
  sender?: iBankAccount | Types.ObjectId | string;
  receiver?: iBankAccount | Types.ObjectId | string;
  transactionCategory?: iCategory | Types.ObjectId | string;
  bankAccountID?: iBankAccount | Types.ObjectId | string;
}

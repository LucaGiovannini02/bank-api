import { Types } from 'mongoose';
import { User } from '../user/user.entity';
import { Transaction } from '../newtransactions/transaction.entity';

export interface BankAccount {
  id?: string;
  user?: User | Types.ObjectId | string;
  openingDate?: Date;
  iban?: string;
  balance?: Transaction | Types.ObjectId | Number;
}

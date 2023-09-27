import { Schema, model } from 'mongoose';
import { Transaction as ITransaction } from './transaction.entity';

export const transactionSchema = new Schema<ITransaction>({
  amount: Number,
  balance: Number,
  date: Date,
  description: String,
  sender: { type: Schema.Types.ObjectId, ref: 'BankAccount' },
  receiver: { type: Schema.Types.ObjectId, ref: 'BankAccount' },
  transactionCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
  // bankAccountID: { type: Schema.Types.ObjectId, ref: 'BankAccount' },
});

transactionSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

transactionSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Transaction = model<ITransaction>(
  'Transaction',
  transactionSchema
);

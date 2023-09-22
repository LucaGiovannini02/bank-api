import mongoose, { Schema, model } from 'mongoose';
import { Transaction as iTransaction } from './transactions.entity';

export const transactionSchema = new mongoose.Schema<iTransaction>({
  amount: Number,
  balance: Number,
  date: Date,
  bankAccount: { type: Schema.Types.ObjectId, ref: 'BankAccount' },
  transactionCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
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

export const Transaction = model<iTransaction>(
  'BankAccountTransaction',
  transactionSchema
);

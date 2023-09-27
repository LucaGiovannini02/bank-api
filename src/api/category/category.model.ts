import mongoose, { Schema, model } from 'mongoose';
import { Category as iCategory } from './category.entity';

export const categorySchema = new mongoose.Schema<iCategory>({
  category: String,
  type: String,
  uid: String,
});

categorySchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

categorySchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Category = model<iCategory>('TransactionCategory', categorySchema);

import mongoose, { Schema } from 'mongoose';
import { BankAccount as iBankAccount } from './bank-account.entity';

export const bankAccountSchema = new mongoose.Schema<iBankAccount>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    openingDate: Date,
    iban: String
});

bankAccountSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

bankAccountSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const BankAccount = mongoose.model<iBankAccount>('BankAccount', bankAccountSchema);
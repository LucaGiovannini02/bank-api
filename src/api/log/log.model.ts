import { Schema, model } from 'mongoose';
import { Log as iLog } from './log.entity';

export const logSchema = new Schema<iLog>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String,
    ip: String,
    date: Date,
    isGoodEnded: Boolean
});

logSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

logSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

export const Log = model<iLog>(
    'Log',
    logSchema
);

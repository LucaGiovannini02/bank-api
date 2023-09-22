import  mongoose from 'mongoose';
import { User as iUser} from './user.entity';

export const userSchema = new mongoose.Schema<iUser>({
  name: String,
  surname: String
});

userSchema.virtual('fullName').get(function() {
    return `${this.name} ${this.surname}`;
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

userSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const User = mongoose.model<iUser>('User', userSchema);
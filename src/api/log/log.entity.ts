import { Types } from 'mongoose';
import { User } from '../user/user.entity';

export interface Log {
  id?: string;
  userId?: User | Types.ObjectId | string;
  type?: string;
  ip?: string;
  date?: Date;
  isGoodEnded?: boolean;
}
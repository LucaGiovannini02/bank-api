import { Types } from "mongoose";
import { User } from "../user/user.entity";

export interface BankAccount {
    id?: string;
    user?: User | Types.ObjectId | string;
    openingDate?: Date;
    iban?: string;
}
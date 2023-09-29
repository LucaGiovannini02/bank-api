import { BankAccount } from './bank-account.entity';
import { BankAccount as BankAccountModel } from './bank-account.model';
import generateIban from '../../utils/bank/iban-calculator';

export class BankAccountService {
  async add(userId: string): Promise<BankAccount> {
    let bankAccount: BankAccount = {};
    bankAccount.openingDate = new Date();
    bankAccount.iban = generateIban(22);
    bankAccount.user = userId;
    let newBankAccount = await BankAccountModel.create({ ...bankAccount });
    return await newBankAccount.populate(['user']);
  }

  async getByUser(userId: string) {
    return BankAccountModel.findOne({ user: userId });
  }
}

export default new BankAccountService();

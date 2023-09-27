import { BankAccount } from '../bank-account/bank-account.model';
import { Transaction as iTransaction } from './transactions.entity';
import { Transaction } from './transactions.model';

export class TransactionService {
  async createTransaction(
    amount: number,
    description: string,
    senderAccountId: string,
    recipientAccountId: string
  ): Promise<iTransaction> {
    try {
      // Calculate the current date
      const currentDate = new Date();

      // Create the transaction without balance
      const transactionData: iTransaction = {
        amount,
        balance: 0,
        date: currentDate,
        description,
        bankAccount: senderAccountId,
        transactionCategory: '',
      };

      const createdTransaction = await Transaction.create(transactionData);

      // Update sender's balance
      const senderAccountBalance = await this.getBalanceByBankAccountId(
        senderAccountId
      );
      const newSenderBalance = senderAccountBalance - amount;
      await this.updateTransactionBalance(senderAccountId, newSenderBalance);

      // Update recipient's balance
      const recipientAccountBalance = await this.getBalanceByBankAccountId(
        recipientAccountId
      );
      const newRecipientBalance = recipientAccountBalance + amount;
      await this.updateTransactionBalance(
        recipientAccountId,
        newRecipientBalance
      );

      return createdTransaction;
    } catch (error) {
      throw error;
    }
  }

  async getBalanceByBankAccountId(bankAccountId: string): Promise<number> {
    try {
      // Retrieve the last transaction for the bank account
      const lastTransaction = await Transaction.findOne(
        { bankAccount: bankAccountId },
        {},
        { sort: { date: -1 } }
      );

      if (!lastTransaction) {
        return 0; // No transactions for the bank account yet
      }

      return lastTransaction.balance;
    } catch (error) {
      throw error;
    }
  }

  private async getBankAccountIdByUserId(
    userId: string
  ): Promise<string | null> {
    const bankAccount = await BankAccount.findOne({ user: userId }, '_id');
    return bankAccount ? bankAccount._id.toString() : null;
  }

  private async updateTransactionBalance(
    transactionId: string,
    newBalance: number
  ): Promise<void> {
    try {
      // Find and update the transaction's balance
      await Transaction.findByIdAndUpdate(transactionId, {
        balance: newBalance,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new TransactionService();

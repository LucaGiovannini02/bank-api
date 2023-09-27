import { BankAccount } from '../bank-account/bank-account.model';
import { Transaction as iTransaction } from './transaction.entity';
import { Transaction } from './transaction.model';

export class TransactionService {
  async createTransaction(
    senderIBAN: string,
    receiverIBAN: string,
    amount: number
  ): Promise<iTransaction[]> {
    try {
      // Get the sender and receiver bank accounts using populate
      const senderAccount = await BankAccount.findOne({ iban: senderIBAN });
      const receiverAccount = await BankAccount.findOne({ iban: receiverIBAN });

      const senderLastTransaction = await Transaction.findOne({});
      const receiverLastTransaction = await Transaction.findOne({});

      // Retrieve the sender's and receiver's balances or default to 0
      const senderBalance = senderLastTransaction
        ? senderLastTransaction.balance
        : 0;
      const receiverBalance = receiverLastTransaction
        ? receiverLastTransaction.balance
        : 0;

      // Calculate the new balances
      const senderNewBalance = senderBalance! - amount;
      const receiverNewBalance = receiverBalance! + amount;

      // Create transactions for sender and receiver
      const senderTransaction = new Transaction({
        amount: -amount,
        balance: senderNewBalance,
        date: new Date(),
        sender: senderAccount,
        receiver: receiverAccount,
        BankAccount: senderAccount?._id,
        // Other properties you may want to set
      });

      const receiverTransaction = new Transaction({
        amount,
        balance: receiverNewBalance,
        date: new Date(),
        sender: senderAccount,
        receiver: receiverAccount,
        BankAccount: receiverAccount?._id,
        // Other properties you may want to set
      });

      // Save both transactions to the database
      await senderTransaction.save();
      await receiverTransaction.save();

      // Return both saved transactions
      return [senderTransaction, receiverTransaction];
    } catch (error) {
      // Handle any errors that occur during the save operation
      throw error; // You may want to handle the error more gracefully in a production application
    }
  }
}

export default new TransactionService();

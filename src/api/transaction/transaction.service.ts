import { FilterQuery, Query } from 'mongoose';
import { BankAccount } from '../bank-account/bank-account.model';
import { Transaction as iTransaction } from './transaction.entity';
import { Transaction } from './transaction.model';
import logService from '../log/log.service';

function randomDepositAmount(minAmount: number, maxAmount: number) {
  const randomAmount =
    Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;
  return randomAmount;
}

export class TransactionService {
  async getBalance(bankAccountId: string) {
    try {
      const lastOperation = await Transaction.findOne({
        bankAccountID: bankAccountId,
      }).sort({ date: -1 });

      if (!lastOperation) {
        return null;
      }

      const balance = lastOperation.balance;

      return balance;
    } catch (error) {
      throw error;
    }
  }
  async getTransactionsWithFilters(
    bankAccount: string,
    query: any
  ): Promise<iTransaction[]> {
    try {
      const q: FilterQuery<iTransaction> = {
        bankAccountID: bankAccount,
      };

      if (query.category) {
        q.transactionCategory = query.category;
      }

      if (query.startDate) {
        q.date['$gte'] = new Date(query.startDate);
      }

      if (query.endDate) {
        q.date['$lte'] = new Date(query.endDate);
      }

      const transactions = await Transaction.find(q)
        .limit(query.number || 0)
        .sort({ date: -1 });

      return transactions;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionDetails(bankAccountId: string, transactionId: string) {
    try {
      const transactions = await this.getTransactionsByBankAccount(
        bankAccountId
      );

      const transaction = transactions.find((t) => t.id === transactionId);

      return transaction;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionsByBankAccount(bankAccountId: string) {
    try {
      const transactions = await Transaction.find({
        bankAccountID: bankAccountId,
      }).populate(['sender', 'receiver', 'transactionCategory']);
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  async firstDepositTransaction(id: string | undefined): Promise<iTransaction> {
    try {
      const bankAccount = await BankAccount.findById(id);

      if (!bankAccount) {
        throw new Error('Bank account not found.');
      }
      const newBalance = randomDepositAmount(100, 1000);

      const depositTransaction = new Transaction({
        amount: newBalance,
        balance: newBalance,
        date: new Date(),
        sender: bankAccount,
        receiver: bankAccount,
        transactionCategory: 'versamento in contanti',
        bankAccountID: bankAccount._id,
      });

      await depositTransaction.save();

      return depositTransaction;
    } catch (error) {
      throw error;
    }
  }

  async bankAccountOpeningTransaction(
    id: string | undefined
  ): Promise<iTransaction> {
    try {
      const bankAccount = await BankAccount.findById(id);

      if (!bankAccount) {
        throw new Error('Bank account not found.');
      }

      const openingTransaction = new Transaction({
        amount: 0,
        balance: 0,
        date: new Date(),
        sender: bankAccount,
        receiver: bankAccount,
        transactionCategory: 'apertura conto',
        bankAccountID: bankAccount._id,
      });

      await openingTransaction.save();

      return openingTransaction;
    } catch (error) {
      throw error;
    }
  }

  async bankTransfer(
    senderIBAN: string,
    receiverIBAN: string,
    amount: number
  ): Promise<iTransaction[]> {
    try {
      const senderAccount = await BankAccount.findOne({ iban: senderIBAN });
      const receiverAccount = await BankAccount.findOne({ iban: receiverIBAN });

      const senderLastTransaction = await Transaction.findOne({
        bankAccountID: senderAccount?._id,
      }).sort({ date: -1, _id: -1 }); // Sort by date and _id in descending order

      const receiverLastTransaction = await Transaction.findOne({
        bankAccountID: receiverAccount?._id,
      }).sort({ date: -1, _id: -1 }); // Sort by date and _id in descending order

      if (!senderAccount || !receiverAccount) {
        throw new Error('Sender or receiver account not found');
      }

      if (
        !senderLastTransaction?.balance ||
        senderLastTransaction.balance === 0
      ) {
        throw new Error('Sender account has zero balance');
      }

      const senderBalance = senderLastTransaction.balance;
      const receiverBalance = receiverLastTransaction!.balance;

      if (amount > senderBalance) {
        throw new Error('Insufficient funds in the sender account');
      }

      const senderNewBalance = senderBalance - amount;
      const receiverNewBalance = receiverBalance! + amount;

      const senderTransaction = new Transaction({
        amount: -amount,
        balance: senderNewBalance,
        date: new Date(),
        sender: senderAccount,
        receiver: receiverAccount,
        transactionCategory: 'bonifico_in_uscita',
        bankAccountID: senderAccount?._id,
      });

      const receiverTransaction = new Transaction({
        amount,
        balance: receiverNewBalance,
        date: new Date(),
        sender: senderAccount,
        receiver: receiverAccount,
        transactionCategory: 'bonifico_in_entrata',
        bankAccountID: receiverAccount?._id,
      });

      await senderTransaction.save();
      await receiverTransaction.save();

      return [senderTransaction, receiverTransaction];
    } catch (error) {
      throw error;
    }
  }

  async phoneRecharge(
    phoneNumber: string,
    senderIban: string,
    amount: number
  ): Promise<iTransaction[]> {
    try {
      // Get the sender account using populate
      const senderAccount = await BankAccount.findOne({ iban: senderIban });

      // Find the last transaction for sender account
      const senderLastTransaction = await Transaction.findOne({
        bankAccountID: senderAccount?._id,
      }).sort({ date: -1, _id: -1 }); // Sort by date and _id in descending order

      // Ensure the sender account exist
      if (!senderAccount) {
        throw new Error('Sender account not found');
      }

      // Ensure the sender account have a non-zero balance
      if (
        !senderLastTransaction?.balance ||
        senderLastTransaction.balance === 0
      ) {
        throw new Error('Sender account has zero balance');
      }

      // Calculate the new balances
      const senderBalance = senderLastTransaction.balance;

      // Check if sender has sufficient funds for the transfer
      if (amount > senderBalance) {
        throw new Error('Insufficient funds in the sender account');
      }

      const senderNewBalance = senderBalance - amount;

      // Create transactions for sender
      const senderTransaction = new Transaction({
        amount: -amount,
        balance: senderNewBalance,
        date: new Date(),
        sender: senderAccount,
        phoneNumber: phoneNumber,
        transactionCategory: 'phone_recharge',
        bankAccountID: senderAccount?._id,
      });

      // Save both transactions to the database
      await senderTransaction.save();

      // Return saved transaction
      return [senderTransaction];
    } catch (error) {
      // Handle any errors that occur during the save operation
      throw error; // You may want to handle the error more gracefully in a production application
    }
  }
}

export default new TransactionService();

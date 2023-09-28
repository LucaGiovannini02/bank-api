import { FilterQuery } from 'mongoose';
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
  async firstDepositTransaction(id: string | undefined): Promise<iTransaction> {
    try {
      // Find the bank account by ID
      const bankAccount = await BankAccount.findById(id);

      if (!bankAccount) {
        throw new Error('Bank account not found.');
      }
      const newBalance = randomDepositAmount(100, 1000);

      // Create a transaction for the first deposit
      const depositTransaction = new Transaction({
        amount: newBalance,
        balance: newBalance,
        date: new Date(),
        sender: bankAccount,
        receiver: bankAccount,
        transactionCategory: 'versamento in contanti',
        bankAccountID: bankAccount._id,
      });

      // Save the transaction to the database
      await depositTransaction.save();

      return depositTransaction;
    } catch (error) {
      // Handle any errors that occur during the save operation
      throw error; // You may want to handle the error more gracefully in a production application
    }
  }

  async bankAccountOpeningTransaction(
    id: string | undefined
  ): Promise<iTransaction> {
    try {
      // Find the bank account by ID
      const bankAccount = await BankAccount.findById(id);

      if (!bankAccount) {
        throw new Error('Bank account not found.');
      }

      // Create a transaction for the bank account opening
      const openingTransaction = new Transaction({
        amount: 0, // Set the opening balance to 0
        balance: 0,
        date: new Date(),
        sender: bankAccount,
        receiver: bankAccount,
        transactionCategory: 'apertura conto',
        bankAccountID: bankAccount._id,
      });

      // Save the transaction to the database
      await openingTransaction.save();

      return openingTransaction;
    } catch (error) {
      // Handle any errors that occur during the save operation
      throw error; // You may want to handle the error more gracefully in a production application
    }
  }

  async bankTransfer(
    senderIBAN: string,
    receiverIBAN: string,
    amount: number
  ): Promise<iTransaction[]> {
    try {
      // Get the sender and receiver bank accounts using populate
      const senderAccount = await BankAccount.findOne({ iban: senderIBAN });
      const receiverAccount = await BankAccount.findOne({ iban: receiverIBAN });

      // Find the last transaction for sender and receiver accounts
      const senderLastTransaction = await Transaction.findOne({
        bankAccountID: senderAccount?._id,
      }).sort({ date: -1, _id: -1 }); // Sort by date and _id in descending order

      const receiverLastTransaction = await Transaction.findOne({
        bankAccountID: receiverAccount?._id,
      }).sort({ date: -1, _id: -1 }); // Sort by date and _id in descending order

      // Ensure the sender and receiver accounts exist
      if (!senderAccount || !receiverAccount) {
        throw new Error('Sender or receiver account not found');
      }

      // Ensure the sender and receiver accounts have a non-zero balance
      if (
        !senderLastTransaction?.balance ||
        senderLastTransaction.balance === 0
      ) {
        throw new Error('Sender account has zero balance');
      }

      // Calculate the new balances
      const senderBalance = senderLastTransaction.balance;
      const receiverBalance = receiverLastTransaction!.balance;

      // Check if sender has sufficient funds for the transfer
      if (amount > senderBalance) {
        throw new Error('Insufficient funds in the sender account');
      }

      const senderNewBalance = senderBalance - amount;
      const receiverNewBalance = receiverBalance! + amount;

      // Create transactions for sender and receiver
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

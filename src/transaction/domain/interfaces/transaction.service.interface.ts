import { ITransaction } from "./transaction.interface";

export interface ITransactionService {
    getTransactionsFromCollectionToWallet: (contract: string, wallet: string) => Promise<ITransaction[]>;
  }
  
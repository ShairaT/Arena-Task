import { ITransaction } from "./transaction.interface";

export interface ITransactionService {
  getTransactionsFromContractToWallet: (contract: string, wallet: string) => Promise<ITransaction[]>;
  }

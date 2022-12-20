export interface ITransactionService {
    getTransactionsFromCollectionToWallet: (contract: string, wallet: string) => Promise<any[]>;
  }
  
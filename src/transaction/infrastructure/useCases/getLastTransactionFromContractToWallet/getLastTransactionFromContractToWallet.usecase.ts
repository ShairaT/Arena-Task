import { UnexpectedError } from "../../../../shared/exceptions/UnexpectedError.exception";
import { Logger } from "../../../../shared/lib/logger";
import { UnableToFindTransactions } from "../../../domain/exceptions/UnableToFindTransactions.exception";
import { ITransaction } from "../../../domain/interfaces/transaction.interface";
import { GetLastTransactionFromContractToWalletDTO } from "../../dto/GetLastTransactionFromContractToWallet.dto";
import { TransactionService } from "../../services/transaction.service";

export class GetLastTransactionFromContractToWalletUseCase {
  private readonly logger;
  private readonly transactionService: TransactionService;

  constructor() {
    this.logger = Logger.getInstance();
    this.transactionService = new TransactionService(this.logger);
  }
  async execute(
    dto: GetLastTransactionFromContractToWalletDTO
  ): Promise<ITransaction> {
    try {
      const { contractAddress, walletAddress } = dto;
      const transactions = await this.transactionService.getTransactionsFromContractToWallet(contractAddress, walletAddress);
      if (transactions.length === 0) {
        throw new UnableToFindTransactions();
      }
      return transactions[0];
    } catch (error) {
      this.logger.error(error);
      if(error instanceof UnableToFindTransactions){
        throw error;
      }
      throw new UnexpectedError();
    }
  }
}

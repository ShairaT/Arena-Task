import { UnexpectedError } from "../../../../shared/exceptions/UnexpectedError.exception";
import { Logger } from "../../../../shared/lib/logger";
import { UnableToFindTransactions } from "../../../domain/exceptions/UnableToFindTransactions.exception";
import { GetMostTransactionsAddressFromContractDTOType } from "../../../domain/interfaces/types";
import { TransactionService } from "../../services/transaction.service";

export class GetMostTransactionsAddressFromContractUseCase {
  private readonly logger;
  private readonly transactionService: TransactionService;

  constructor() {
    this.logger = Logger.getInstance();
    this.transactionService = new TransactionService(this.logger);
  }
  async execute(
    dto: GetMostTransactionsAddressFromContractDTOType
  ): Promise<string> {
    try {
      const { contractAddress, walletAddresses } = dto;
      const walletAddress = await this.transactionService.getMostTransactionsAddressFromContract(contractAddress, walletAddresses);
      if (!walletAddress) {
        throw new UnableToFindTransactions();
      }
      return walletAddress;
    } catch (error) {
      this.logger.error(error);
      if(error instanceof UnableToFindTransactions){
          throw error;
      }
      throw new UnexpectedError();
    }
  }
}

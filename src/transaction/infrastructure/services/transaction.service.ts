import { Logger } from "winston";
import axios from "axios";
import { ITransactionService } from "../../domain/interfaces/transaction.service.interface";
import { UnableToFindTransactions } from "../../domain/exceptions/UnableToFindTransactions.exception";
import { UnexpectedError } from "../../../shared/exceptions/UnexpectedError.exception";

export class TransactionService implements ITransactionService {
  protected logger;
  private apiUrl: string;
  private apiKey: string;

  constructor(logger: Logger) {
    this.logger = logger;
    this.apiUrl = process.env.API_URL;
    this.apiKey = process.env.API_KEY;
  }

  public getTransactionsFromCollectionToWallet = async (
    constract: string,
    wallet: string
  ): Promise<any> => {
    try {
      const data = {
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
          {
            contractAddresses: [constract],
            toAddress: wallet,
            category: ["erc20", "erc721", "erc1155"],
            order: "asc",
          },
        ],
      };
      const transactions = await axios.post(
        `${this.apiUrl}/${this.apiKey}`,
        data
      );
      return transactions.data?.result;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  };
}

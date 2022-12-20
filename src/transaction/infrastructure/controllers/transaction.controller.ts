import { Request, Response } from "express";
import { Logger } from "../../../shared/lib/logger";
import { GetLastTransactionFromCollectionToWalletDTO } from "../dto/GetLastTransactionFromCollectionToWallet.dto";
import { GetLastTransactionFromCollectionToWalletUseCase } from "../useCases/getLastTransactionFromContractToWallet/getLastTransactionFromContractToWallet.usecase";
import { GetMostTransactionsAddressFromCollectionDTO } from "../dto/getMostTransactionsAddressFromCollection.dto";
import { GetMostTransactionsAddressFromCollectionUseCase } from "../useCases/getMostTransactionsAddressFromCollection/getMostTransactionsAddressFromCollection.usecase";
export class TransactionController {

  public async getLastTransactionFromContractToWallet(req: Request, res: Response): Promise<void> {
    const dto = new GetLastTransactionFromCollectionToWalletDTO(req);
    const transaction = await new GetLastTransactionFromCollectionToWalletUseCase().execute(dto);
    res.status(200).json(transaction);
  }

  public async getMostTransactionsWalletFromContract(req: Request, res: Response): Promise<void> {
    const dto = new GetMostTransactionsAddressFromCollectionDTO(req);
    const transaction = await new GetMostTransactionsAddressFromCollectionUseCase().execute(dto);
    res.status(200).json(transaction);
  }
}

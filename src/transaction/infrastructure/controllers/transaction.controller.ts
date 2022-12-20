import { Request, Response } from "express";
import { Logger } from "../../../shared/lib/logger";
import { GetLastTransactionFromCollectionToWalletDTO } from "../dto/GetLastTransactionFromCollectionToWallet.dto";
import { GetLastTransactionFromCollectionToWalletUseCase } from "../useCases/getLastTransactionFromContractToWallet/getLastTransactionFromContractToWallet.usecase";
export class TransactionController {

  public async getLastTransactionFromContractToWallet(req: Request, res: Response): Promise<void> {
    const dto = new GetLastTransactionFromCollectionToWalletDTO(req);
    const transaction = await new GetLastTransactionFromCollectionToWalletUseCase().execute(dto);
    res.status(200).json(transaction);
  }
}

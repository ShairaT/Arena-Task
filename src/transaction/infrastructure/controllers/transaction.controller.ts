import { Request, Response } from "express";
import { Logger } from "../../../shared/lib/logger";
import { GetLastTransactionFromContractToWalletDTO } from "../dto/GetLastTransactionFromContractToWallet.dto";
import { GetLastTransactionFromContractToWalletUseCase } from "../useCases/getLastTransactionFromContractToWallet/getLastTransactionFromContractToWallet.usecase";
import { GetMostTransactionsAddressFromContractDTO } from "../dto/getMostTransactionsAddressFromContract.dto";
import { GetMostTransactionsAddressFromContractUseCase } from "../useCases/getMostTransactionsAddressFromContract/getMostTransactionsAddressFromContract.usecase";
export class TransactionController {
  public async getLastTransactionFromContractToWallet(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const dto = new GetLastTransactionFromContractToWalletDTO(req);
      const transaction =
        await new GetLastTransactionFromContractToWalletUseCase().execute(dto);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(error.status).send(error);
    }
  }

  public async getMostTransactionsWalletFromContract(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const dto = new GetMostTransactionsAddressFromContractDTO(req);
      const transaction =
        await new GetMostTransactionsAddressFromContractUseCase().execute(dto);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(error.status).send(error);
    }
  }
}

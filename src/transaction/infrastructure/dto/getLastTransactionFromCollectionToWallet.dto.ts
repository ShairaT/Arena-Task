import { Request } from "express";
import { GetLastTransactionFromCollectionToWalletDTOType } from "../../domain/interfaces/types";


export class GetLastTransactionFromCollectionToWalletDTO
  implements GetLastTransactionFromCollectionToWalletDTOType
{
  contractAddress: string;
  walletAddress: string;

  constructor(req: Request) {
    const { contractAddress, walletAddress } = req.body;
    this.contractAddress = contractAddress;
    this.walletAddress = walletAddress;
  }
}


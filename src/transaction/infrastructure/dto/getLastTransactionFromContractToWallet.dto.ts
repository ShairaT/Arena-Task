import { Request } from "express";
import { GetLastTransactionFromContractToWalletDTOType } from "../../domain/interfaces/types";


export class GetLastTransactionFromContractToWalletDTO
  implements GetLastTransactionFromContractToWalletDTOType
{
  contractAddress: string;
  walletAddress: string;

  constructor(req: Request) {
    const { contractAddress, walletAddress } = req.body;
    this.contractAddress = contractAddress;
    this.walletAddress = walletAddress;
  }
}


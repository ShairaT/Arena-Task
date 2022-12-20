import { Request } from "express";
import { GetMostTransactionsAddressFromCollectionDTOType } from "../../domain/interfaces/types";


export class GetMostTransactionsAddressFromCollectionDTO
  implements GetMostTransactionsAddressFromCollectionDTOType
{
  contractAddress: string;
  walletAddresses: string[];

  constructor(req: Request) {
    const { contractAddress, walletAddresses } = req.body;
    this.contractAddress = contractAddress;
    this.walletAddresses = walletAddresses;
  }
}


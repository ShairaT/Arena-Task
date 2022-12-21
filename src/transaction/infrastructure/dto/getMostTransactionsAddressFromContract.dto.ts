import { Request } from "express";
import { GetMostTransactionsAddressFromContractDTOType } from "../../domain/interfaces/types";


export class GetMostTransactionsAddressFromContractDTO
  implements GetMostTransactionsAddressFromContractDTOType
{
  contractAddress: string;
  walletAddresses: string[];

  constructor(req: Request) {
    const { contractAddress, walletAddresses } = req.body;
    this.contractAddress = contractAddress;
    this.walletAddresses = walletAddresses;
  }
}


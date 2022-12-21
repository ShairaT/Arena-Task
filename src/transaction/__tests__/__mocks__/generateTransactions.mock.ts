import * as crypto from "crypto";
import { ITransaction } from "../../domain/interfaces/transaction.interface";
import { generateRandomAddress } from "./generateRandomAddress.mock";

export function generateTransactions(
  num: number,
  options?: Partial<ITransaction>,
): ITransaction[] {
  const transactions = [];
  for (let i = 0; i < num; i++) {
    transactions.push({
      id: options?.id || generateRandomAddress(),
      hash: options?.hash || generateRandomAddress(),
      blockNum: options?.blockNum || crypto.randomBytes(10).toString("hex"),
      walletAddress: options?.walletAddress || generateRandomAddress(),
      value: options?.value || Math.random(),
      contractAddress: options?.contractAddress|| generateRandomAddress(),
    });
  }
  return transactions;
}

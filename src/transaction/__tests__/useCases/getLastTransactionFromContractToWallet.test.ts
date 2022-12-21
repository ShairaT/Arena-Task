import { TransactionService } from "../../infrastructure/services/transaction.service";
import { generateTransactions } from "../__mocks__/generateTransactions.mock";
import { generateRandomAddress } from "../__mocks__/generateRandomAddress.mock";
import { GetLastTransactionFromContractToWalletUseCase } from "../../infrastructure/useCases/getLastTransactionFromContractToWallet/getLastTransactionFromContractToWallet.usecase";
import { Logger } from "../../../shared/lib/logger";
import { UnableToFindTransactions } from "../../domain/exceptions/UnableToFindTransactions.exception";
import { UnexpectedError } from "../../../shared/exceptions/UnexpectedError.exception";

beforeEach(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

describe("Test GetLastTransactionFromContractToWalletUseCase", (): void => {
  it("Should return the last transaction from a given wallet and contract address", async (): Promise<void> => {
    const contractAddress = "somefakecontractaddress";
    const walletAddress = "somefakewalletaddress";
    const transactions = generateTransactions(2, {
      contractAddress,
      walletAddress,
    });
    const transactionServiceSpy = jest
      .spyOn(
        TransactionService.prototype,
        "getTransactionsFromContractToWallet"
      )
      .mockImplementation(async () => {
        return transactions;
      });
    const response =
      await new GetLastTransactionFromContractToWalletUseCase().execute({
        contractAddress,
        walletAddress,
      });
    expect(transactionServiceSpy).toHaveBeenCalledWith(
      contractAddress,
      walletAddress
    );
    expect(response).toMatchObject(transactions[0]);
  });
  it("Should return UnableToFindTransactions if there are no transactions", async (): Promise<void> => {
    const contractAddress = "somefakecontractaddress";
    const walletAddress = "somefakewalletaddress";
    const transactionServiceSpy = jest
      .spyOn(
        TransactionService.prototype,
        "getTransactionsFromContractToWallet"
      )
      .mockImplementation(async () => {
        return [];
      });
    try {
      await new GetLastTransactionFromContractToWalletUseCase().execute({
        contractAddress,
        walletAddress,
      });
    } catch (error) {
      expect(error instanceof UnableToFindTransactions).toBeTruthy();
    }
    expect(transactionServiceSpy).toHaveBeenCalledWith(
      contractAddress,
      walletAddress
    );
  });
  it("Should return UnexpectedError if there was an error", async (): Promise<void> => {
    const contractAddress = "somefakecontractaddress";
    const walletAddress = "somefakewalletaddress";
    const transactionServiceSpy = jest
      .spyOn(
        TransactionService.prototype,
        "getTransactionsFromContractToWallet"
      )
      .mockImplementation(async () => {
        throw new Error();
      });
    try {
      await new GetLastTransactionFromContractToWalletUseCase().execute({
        contractAddress,
        walletAddress,
      });
    } catch (error) {
      expect(error instanceof UnexpectedError).toBeTruthy();
    }
    expect(transactionServiceSpy).toHaveBeenCalledWith(
      contractAddress,
      walletAddress
    );
  });
});

import { TransactionService } from "../../infrastructure/services/transaction.service";
import { generateTransactions } from "../__mocks__/generateTransactions.mock";
import { UnexpectedError } from "../../../shared/exceptions/UnexpectedError.exception";
import { GetMostTransactionsAddressFromContractUseCase } from "../../infrastructure/useCases/getMostTransactionsAddressFromContract/getMostTransactionsAddressFromContract.usecase";

beforeEach(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

describe("Test GetMostTransactionsAddressFromContractUseCase", (): void => {
  it("Should return the last transaction from a given wallet and contract address", async (): Promise<void> => {
    const contractAddress = "somefakecontractaddress";
    const walletAddressWithMostTransactions = "somefakewalletaddress";
    const walletAddress = "somefakewalletaddress2";
    const walletAddresses = [walletAddressWithMostTransactions, walletAddress];
    const transactions = generateTransactions(3, {
      contractAddress,
      walletAddress: walletAddressWithMostTransactions,
    }).concat(generateTransactions(2, { contractAddress, walletAddress }));
    const transactionServiceGetTransactionSpy = jest
      .spyOn(
        TransactionService.prototype,
        "getTransactionsFromContractToWallet"
      )
      .mockImplementation(async () => {
        return transactions;
      });
    const transactionServiceGetMostTransactionsSpy = jest.spyOn(
      TransactionService.prototype,
      "getMostTransactionsAddressFromContract"
    );
    const response =
      await new GetMostTransactionsAddressFromContractUseCase().execute({
        contractAddress,
        walletAddresses,
      });
    walletAddresses.forEach((walletAddress) => {
      expect(transactionServiceGetTransactionSpy).toHaveBeenCalledWith(
        contractAddress,
        walletAddress
      );
    });
    expect(transactionServiceGetMostTransactionsSpy).toHaveBeenCalledWith(
      contractAddress,
      walletAddresses
    );
    expect(response).toEqual(walletAddressWithMostTransactions);
  });
  it("Should return UnexpectedError if there was an error", async (): Promise<void> => {
    const contractAddress = "somefakecontractaddress";
    const walletAddressWithMostTransactions = "somefakewalletaddress";
    const walletAddress = "somefakewalletaddress2";
    const walletAddresses = [walletAddressWithMostTransactions, walletAddress];
    const transactions = generateTransactions(3, {
      contractAddress,
      walletAddress: walletAddressWithMostTransactions,
    }).concat(generateTransactions(2, { contractAddress, walletAddress }));
    jest
      .spyOn(
        TransactionService.prototype,
        "getTransactionsFromContractToWallet"
      )
      .mockImplementation(async () => {
        throw new Error();
      });
    const transactionServiceGetMostTransactionsSpy = jest.spyOn(
      TransactionService.prototype,
      "getMostTransactionsAddressFromContract"
    );
    try {
      await new GetMostTransactionsAddressFromContractUseCase().execute({
        contractAddress,
        walletAddresses,
      });
    } catch (error) {
      expect(error instanceof UnexpectedError).toBeTruthy();
    }
    expect(transactionServiceGetMostTransactionsSpy).toHaveBeenCalledWith(
        contractAddress,
        walletAddresses
      );
  });
});

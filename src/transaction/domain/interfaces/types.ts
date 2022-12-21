export type GetLastTransactionFromContractToWalletDTOType = {
    contractAddress: string;
    walletAddress: string;
};

export type GetMostTransactionsAddressFromContractDTOType = {
    contractAddress: string;
    walletAddresses: string[];
};

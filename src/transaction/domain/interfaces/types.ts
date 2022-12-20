export type GetLastTransactionFromCollectionToWalletDTOType = {
    contractAddress: string;
    walletAddress: string;
};

export type GetMostTransactionsAddressFromCollectionDTOType = {
    contractAddress: string;
    walletAddresses: string[];
};

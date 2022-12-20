import { ApiError } from "../../../shared/helpers/api.error";


export class UnableToFindTransactions extends ApiError {
  constructor() {
    super({
      status: 404,
      message: UnableToFindTransactions.getMessage(),
      errorCode: 'UNABLE_TO_FIND_TRANSACTIONS_ERROR',
    });
  }

  static getMessage(): string {
    return 'Unable to find transactions';
  }
}
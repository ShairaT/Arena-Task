import { ApiError } from "../helpers/api.error";

export class UnexpectedError extends ApiError {
  constructor() {
    super({
      status: 500,
      message: UnexpectedError.getMessage(),
      errorCode: 'UNEXPECTED_ERROR',
    });
  }

  static getMessage(): string {
    return 'An unexpected error ocurred';
  }
}
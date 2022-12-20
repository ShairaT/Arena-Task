import { BaseRoutes } from "../../../adapters/base.routes";
import { asyncHandler } from "../../../shared/middlewares/asyncHandler";
import { TransactionController } from "../controllers/transaction.controller";

export class TransactionRoutes extends BaseRoutes {
  private transactionController: TransactionController;

  constructor() {
    super({ mergeParams: true });
    this.transactionController = new TransactionController();
    this.routes();
  }
  routes = (): void => {
    this.router.post('/last', asyncHandler(this.transactionController.getLastTransactionFromContractToWallet));
  };
}

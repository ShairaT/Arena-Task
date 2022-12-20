import { Request, Response, Router } from "express";
import { TransactionRoutes } from "../transaction/infrastructure/routes";
const routes = Router();

routes.use("/transaction", new TransactionRoutes().getRouter());

export { routes };

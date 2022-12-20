import { Router, RouterOptions } from 'express';
import { decorate, injectable } from 'inversify';
import 'reflect-metadata';

const create = (target: NewableFunction): void => {
  decorate(injectable(), target);
};

export const Service = () => create;
export const Controller = () => create;
export const Route = () => create;

@injectable()
export abstract class BaseRoutes {
  protected router: Router;

  constructor(options?: RouterOptions) {
    this.router = Router(options);
  }

  getRouter(): Router {
    return this.router;
  }

  abstract routes(): void;
}

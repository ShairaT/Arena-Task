import winston, { loggers } from 'winston';

export class Logger {
  private static instance: winston.Logger;

  static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        transports: [
          new winston.transports.File({ filename: 'app.log' })
        ]
      });
    }
    return Logger.instance;
  }
}

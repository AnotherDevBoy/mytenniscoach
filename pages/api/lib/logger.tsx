import winston from 'winston';

let logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  level: 'info',
  format: winston.format.json()
});

const createLogger = (requestId: string) => {
  logger = logger.child({ requestId: requestId });
};

export { logger, createLogger };

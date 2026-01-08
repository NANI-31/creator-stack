import winston from "winston";

const { printf, combine, timestamp } = winston.format;

// Custom format: [local timestamp]: message
const logFormat = printf(({ timestamp, message }) => {
  return `[${timestamp}]: ${message}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    timestamp({
      format: () => {
        // Local date & time
        return new Date().toLocaleString();
      },
    }),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export { logger, logFormat };

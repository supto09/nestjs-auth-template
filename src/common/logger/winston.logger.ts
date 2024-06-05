import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

// custom log display format
const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - ${level.toUpperCase().padEnd(7)} - ${stack || message}`;
});

const transportConsole = new transports.Console({
  level: 'silly',
  format: format.combine(format.splat(), format.timestamp(), format.json()),
});

const transportError = new transports.DailyRotateFile({
  level: 'error',
  filename: 'logs/%DATE%-error.log',
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  maxFiles: '14d',
  format: customFormat,
});

const transportLog = new transports.DailyRotateFile({
  filename: 'logs/%DATE%-log.log',
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  maxFiles: '14d',
  format: format.combine(format.splat(), format.timestamp(), format.json()),
});

const consoleFileLogger = {
  transports: [transportConsole, transportError, transportLog],
};

export const instance = createLogger(consoleFileLogger);

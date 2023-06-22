import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;
import path from 'path';

//custom format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winstone',
        'success',
        'nextLevel-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winstone',
        'error',
        'nextLevel-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
export { logger, errorLogger };

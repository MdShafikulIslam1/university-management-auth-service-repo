import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', () => {
  // eslint-disable-next-line no-console
  console.log('UncaughtException is detected');
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connect successfully');

    server = app.listen(config.port, () => {
      logger.info(
        `University Management Application listening on port ${config.port}`
      );
    });
  } catch (error) {
    errorLogger.error('failed to connect database', error);
  }
  process.on('unhandledRejection', error => {
    // eslint-disable-next-line no-console
    console.log('Unhandled Rejection ,we are closing the server...', error);
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    }
    process.exit(1);
  });
}
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is detected');
  if (server) {
    server.close();
  }
});

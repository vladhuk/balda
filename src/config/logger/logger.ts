import { LocalLogger } from 'config/logger/local.logger';
import { Logger } from 'config/logger/types/logger.interface';
import { LogglyLogger } from 'config/logger/loggly/loggly.logger';

export const logger: Logger =
  process.env.NODE_ENV === 'production'
    ? new LogglyLogger()
    : new LocalLogger();

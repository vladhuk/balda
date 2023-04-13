import { LocalLogger } from 'config/logger/local.logger';
import { LogglyLogger } from 'config/logger/loggly/loggly.logger';

// eslint-disable-next-line import/no-default-export
export default process.env.NODE_ENV === 'production'
  ? new LogglyLogger()
  : new LocalLogger();

import { Logger } from 'config/logger/types/logger.interface';
import { LogglyTracker } from 'loggly-jslogger';

export class LogglyLogger implements Logger {
  logglyTracker: LogglyTracker;

  constructor() {
    this.logglyTracker = new LogglyTracker();
    this.logglyTracker.push({
      logglyKey: '7a10b788-2f8e-493e-90de-ea5b281b72a6',
    });
  }

  error(data: Record<string, unknown>): void {
    this.logglyTracker.push(data);
  }
}

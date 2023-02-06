interface PushOptions {
  logglyKey?: string;
}

declare module 'loggly-jslogger' {
  class LogglyTracker {
    push(options: PushOptions | Record<string, unknown>): void;
  }
}

export class LocalLogger {
  error(data: Record<string, unknown>) {
    // eslint-disable-next-line no-console
    console.error(data);
  }
}

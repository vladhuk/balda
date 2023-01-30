let nouns: string[] = [];

// eslint-disable-next-line @typescript-eslint/no-floating-promises
import('./nouns.json').then((module) => {
  nouns = module.default;
});

export function getNouns(): string[] {
  return nouns;
}

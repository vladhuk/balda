import { range } from 'lodash';

const CHUNKS_NUMBER = 5;

let nouns: string[] = [];

async function fetchNouns(): Promise<string[]> {
  const modules = await Promise.all<{ default: string[] }>(
    range(CHUNKS_NUMBER).map((i) => import(`./nouns-${i}.json`)),
  );
  return modules
    .map((module) => module.default)
    .reduce((acc, chunk) => acc.concat(chunk), []);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
fetchNouns().then((fetchedNouns) => {
  nouns = fetchedNouns;
});

export function getNouns(): string[] {
  return nouns.slice();
}

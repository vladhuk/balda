import { getNouns } from 'data/lazy';
import { sample } from 'lodash';

export function getRandomWord(letters: number): string | undefined {
  const words = getNouns().filter((word) => word.length === letters);
  return sample(words);
}

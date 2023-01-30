import { sample } from 'lodash';
import nouns from 'data/nouns.json';

export function getRandomWord(letters: number): string | undefined {
  const words = nouns.filter((word) => word.length === letters);
  return sample(words);
}

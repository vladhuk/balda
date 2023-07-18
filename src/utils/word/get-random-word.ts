import { sample } from 'lodash';

export function getRandomWord(
  dictionary: string[],
  letters: number,
): string | undefined {
  const words = dictionary.filter((word) => word.length === letters);
  return sample(words);
}

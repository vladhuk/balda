import { random } from 'lodash';
import nouns from 'data/nouns.json';

export function getRandomWord(letters: number): string {
  const words = nouns.filter((word) => word.length === letters);
  return words[random(0, words.length)];
}

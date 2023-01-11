import { random } from 'lodash';
import nouns from 'data/nouns.json';

export function getRandomWord(): string {
  const words = nouns.filter((word) => word.length === 5);
  return words[random(0, words.length)];
}

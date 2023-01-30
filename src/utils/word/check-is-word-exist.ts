import { getNouns } from 'data/lazy';

export function checkIsWordExist(word: string): boolean {
  return getNouns().includes(word.toLowerCase());
}

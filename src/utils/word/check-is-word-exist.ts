import nouns from 'data/nouns.json';

export function checkIsWordExist(word: string): boolean {
  return nouns.includes(word.toLowerCase());
}

export function checkIsWordExist(dictionary: string[], word: string): boolean {
  return dictionary.includes(word.toLowerCase());
}

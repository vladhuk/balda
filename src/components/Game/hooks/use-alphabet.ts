import { Locale } from 'enums/locale.enum';
import { useLocale } from 'lib/i18next/hooks/use-locale';

const alphabets: Record<Locale, string> = {
  [Locale.UK]: 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ',
  [Locale.EN]: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

export function useAlphabet(): string {
  const locale = useLocale();
  return alphabets[locale];
}

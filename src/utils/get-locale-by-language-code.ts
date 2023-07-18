import { Locale } from 'enums/locale.enum';

export function getLocaleByLanguageCode(code: string): Locale {
  if (Object.values(Locale).includes(code as Locale)) {
    return code as Locale;
  }

  return Locale.UK;
}

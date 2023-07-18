import { Locale } from 'enums/locale.enum';
import { useTranslation } from 'next-i18next';

export function useLocale(): Locale {
  const {
    i18n: { resolvedLanguage },
  } = useTranslation();
  return resolvedLanguage as Locale;
}

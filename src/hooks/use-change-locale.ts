import { Locale } from 'enums/locale.enum';
import { useDictionary } from 'providers/DictionaryProvider';
import { useTranslation } from 'next-i18next';

/** Should be used inside DictionaryProvider and I18NextClientProvider */
export function useChangeLocale(): (locale: Locale) => Promise<void> {
  const { i18n } = useTranslation();
  const { loadLocale } = useDictionary();

  return (locale) =>
    Promise.all([loadLocale(locale), i18n.changeLanguage(locale)]).then();
}

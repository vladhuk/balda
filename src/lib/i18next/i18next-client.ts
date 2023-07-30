import { Locale } from 'enums/locale.enum';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import nextI18nextConfig from '../../../next-i18next.config';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: nextI18nextConfig.i18n.defaultLocale,
    supportedLngs: Object.values(Locale),
    ns: 'common',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

// eslint-disable-next-line import/no-default-export
export default i18next;

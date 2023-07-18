import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useLocale } from 'lib/i18next/hooks/use-locale';
import i18nextClientConfig from 'lib/i18next/i18next-client';

export const I18NextClientProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const serverLocale = useLocale();
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18nextClientConfig
      .changeLanguage(serverLocale)
      .then(() => setIsI18nInitialized(true));
  }, [serverLocale]);

  if (!isI18nInitialized) {
    return <>{children}</>;
  }

  return (
    <I18nextProvider i18n={i18nextClientConfig}>{children}</I18nextProvider>
  );
};

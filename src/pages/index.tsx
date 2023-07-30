import { App } from 'components/App/App';
import { useCommonTranslation } from 'hooks/use-common-translation';
import { useLocale } from 'lib/i18next/hooks/use-locale';
import { I18NextClientProvider } from 'lib/i18next/providers/I18nextClientProvider';
import { getStaticProps } from 'lib/i18next/utils/get-static';
import Head from 'next/head';
import { DictionaryProvider } from 'providers/DictionaryProvider';
import { FC } from 'react';

export { getStaticProps };

const Home: FC = () => {
  const t = useCommonTranslation('meta');
  const locale = useLocale();

  return (
    <>
      <Head>
        <title>{t('title')}</title>

        <link rel="manifest" href={`/manifest_${locale}.json`} />

        <meta name="description" content={t('description') ?? undefined} />

        <meta property="og:url" content="https://balda.org.ua" />
        <meta property="og:title" content={t('title') ?? undefined} />
        <meta
          property="og:description"
          content={t('description') ?? undefined}
        />
        <meta property="og:image" content="/images/og.png" />
        <meta property="og:locale" content={t('ogLocale') ?? undefined} />
      </Head>
      <DictionaryProvider defaultLocale={locale}>
        <I18NextClientProvider>
          <App />
        </I18NextClientProvider>
      </DictionaryProvider>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;

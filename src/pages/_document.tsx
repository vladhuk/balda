import { FC } from 'react';
import { GtmNoscript } from 'lib/google-tag-manager/gtm.noscript';
import { GtmScript } from 'lib/google-tag-manager/gtm.script';
import { Head, Html, Main, NextScript } from 'next/document';

const Document: FC = () => {
  return (
    <Html lang="en">
      <Head>
        <GtmScript strategy="beforeInteractive" />

        <meta name="theme-color" content="#e4eff1" />
        <meta
          name="description"
          content="Балда - це лінгвістична настільна гра або простіше кажучи 'гра в слова'. Грай удвох із другом або ботом навіть за відсутності інтернету."
        />

        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/maskable_192.png" />
        <link rel="manifest" href="/manifest.json" />

        <meta property="og:url" content="https://balda.org.ua" />
        <meta property="og:title" content="Балда - Гра в слова українською" />
        <meta
          property="og:description"
          content="Балда - це лінгвістична настільна гра або простіше кажучи 'гра в слова'. Грай удвох із другом або ботом навіть за відсутності інтернету."
        />
        <meta property="og:image" content="/images/og.png" />
        <meta property="og:locale" content="uk_UA" />
      </Head>
      <body>
        <GtmNoscript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

// eslint-disable-next-line import/no-default-export
export default Document;

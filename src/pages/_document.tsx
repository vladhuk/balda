import { GtmNoscript } from 'lib/google-tag-manager/gtm.noscript';
import { gtmScriptInnerHtml } from 'lib/google-tag-manager/inner-html';
import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { FC } from 'react';

import { i18n } from '../../next-i18next.config';

const Document: FC<DocumentProps> = ({
  __NEXT_DATA__: {
    query: { locale },
  },
}) => {
  const lang = typeof locale === 'string' ? locale : i18n.defaultLocale;

  return (
    <Html lang={lang}>
      <Head>
        <Script
          id="gtm"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: gtmScriptInnerHtml }}
        />

        <meta name="theme-color" content="#e4eff1" />

        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/maskable_192.png" />
        <link rel="manifest" href="/manifest.json" />
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

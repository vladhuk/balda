import { FC } from 'react';

export const GtmNoscript: FC = () => (
  <noscript>
    <iframe
      title="gtm"
      src="https://www.googletagmanager.com/ns.html?id=GTM-5B9NCWG"
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
    />
  </noscript>
);

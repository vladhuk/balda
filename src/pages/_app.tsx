import 'index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { FC } from 'react';
import { theme } from 'config/theme';
import Head from 'next/head';
import type { AppProps } from 'next/app';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;

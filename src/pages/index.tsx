import { App } from 'components/App/App';
import { FC } from 'react';
import Head from 'next/head';

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Балда - Гра в слова українською</title>
      </Head>
      <App />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;

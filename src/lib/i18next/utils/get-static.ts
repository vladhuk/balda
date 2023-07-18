import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../../../../next-i18next.config';

interface Params extends ParsedUrlQuery {
  locale: string;
}

export const getStaticPaths: GetStaticPaths<Params> = () => ({
  fallback: false,
  paths: i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  })),
});

export const getStaticProps: GetStaticProps<SSRConfig, Params> = async (
  context,
) => {
  const locale = context.params?.locale ?? i18nextConfig.i18n.defaultLocale;
  const translationProps = await serverSideTranslations(locale);

  return {
    props: translationProps,
  };
};

module.exports = {
  i18n: {
    defaultLocale: 'uk',
    locales: ['en'],
  },
  react: { useSuspense: false },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

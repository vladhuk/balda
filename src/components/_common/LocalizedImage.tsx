import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';
import { Locale } from 'enums/locale.enum';
import { useLocale } from 'lib/i18next/hooks/use-locale';
import Image, { StaticImageData } from 'next/image';

interface Props extends Omit<BoxProps<typeof Image>, 'component' | 'src'> {
  src: Record<Locale, StaticImageData>;
}

export const LocalizedImage: FC<Props> = ({ src, ...boxProps }) => {
  const locale = useLocale();

  return <Box component={Image} src={src[locale]} {...boxProps} />;
};

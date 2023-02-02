import { useMediaQuery, useTheme } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

export const HideUpMd: FC<PropsWithChildren> = ({ children }) => {
  const { breakpoints } = useTheme();
  const isUpMd = useMediaQuery(breakpoints.up('md'));

  if (isUpMd) {
    return null;
  }

  return <>{children}</>;
};

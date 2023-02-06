import { useIsUpMd } from 'hooks/use-is-up-md';
import React, { FC, PropsWithChildren } from 'react';

export const HideUpMd: FC<PropsWithChildren> = ({ children }) => {
  const isUpMd = useIsUpMd();

  if (isUpMd) {
    return null;
  }

  return <>{children}</>;
};

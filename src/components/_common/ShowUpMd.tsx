import { useIsUpMd } from 'hooks/use-is-up-md';
import React, { FC, PropsWithChildren } from 'react';

export const ShowUpMd: FC<PropsWithChildren> = ({ children }) => {
  const isUpMd = useIsUpMd();

  if (isUpMd) {
    return <>{children}</>;
  }

  return null;
};

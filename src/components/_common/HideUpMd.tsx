import { FC, PropsWithChildren } from 'react';
import { useIsUpMd } from 'hooks/use-is-up-md';

export const HideUpMd: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const isUpMd = useIsUpMd();

  if (isUpMd) {
    return null;
  }

  return <>{children}</>;
};

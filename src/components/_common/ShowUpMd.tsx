import { useIsUpMd } from 'hooks/use-is-up-md';
import { FC, PropsWithChildren } from 'react';

export const ShowUpMd: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const isUpMd = useIsUpMd();

  if (isUpMd) {
    return <>{children}</>;
  }

  return null;
};

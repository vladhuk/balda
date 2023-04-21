import { FC, PropsWithChildren } from 'react';
import { useIsUpMd } from 'hooks/use-is-up-md';

export const ShowUpMd: FC<PropsWithChildren> = ({ children }) => {
  const isUpMd = useIsUpMd();

  if (isUpMd) {
    return <>{children}</>;
  }

  return null;
};

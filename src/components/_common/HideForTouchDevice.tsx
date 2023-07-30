import { useIsTouchDevice } from 'hooks/use-is-touch-device';
import { FC, PropsWithChildren } from 'react';

export const HideForTouchDevice: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return useIsTouchDevice() ? null : <>{children}</>;
};

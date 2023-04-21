import { FC, PropsWithChildren } from 'react';
import { useIsTouchDevice } from 'hooks/use-is-touch-device';

export const HideForTouchDevice: FC<PropsWithChildren> = ({ children }) => {
  return useIsTouchDevice() ? null : <>{children}</>;
};

import { useIsTouchDevice } from 'hooks/use-is-touch-device';
import React, { FC, PropsWithChildren } from 'react';

export const HideForTouchDevice: FC<PropsWithChildren> = ({ children }) => {
  return useIsTouchDevice() ? null : <>{children}</>;
};

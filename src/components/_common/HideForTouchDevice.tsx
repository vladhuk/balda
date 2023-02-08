import { IS_TOUCH_DEVICE } from 'constants/common';
import React, { FC, PropsWithChildren } from 'react';

export const HideForTouchDevice: FC<PropsWithChildren> = ({ children }) => {
  return IS_TOUCH_DEVICE ? null : <>{children}</>;
};

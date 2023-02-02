import React, { ComponentProps, FC, Suspense, lazy } from 'react';

const StatisticsButton = lazy(() => import('./StatisticsButton'));

export const StatisticsButtonLazy: FC<
  ComponentProps<typeof StatisticsButton>
> = (props) => (
  <Suspense fallback={null}>
    <StatisticsButton {...props} />
  </Suspense>
);

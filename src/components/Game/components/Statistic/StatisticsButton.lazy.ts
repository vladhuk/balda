import dynamic from 'next/dynamic';

export const StatisticsButtonLazy = dynamic(() => import('./StatisticsButton'));

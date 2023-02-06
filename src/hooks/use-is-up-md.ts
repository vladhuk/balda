import { useMediaQuery, useTheme } from '@mui/material';

export const useIsUpMd = () => useMediaQuery(useTheme().breakpoints.up('md'));

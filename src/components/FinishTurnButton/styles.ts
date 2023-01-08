import { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = (theme) => ({
  position: 'fixed',
  bottom: 16,
  width: 360,

  [theme.breakpoints.up('sm')]: {
    position: 'static',
    mt: 5,
    px: 0.5,
  },
});

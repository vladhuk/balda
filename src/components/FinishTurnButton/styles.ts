import { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = (theme) => ({
  position: 'fixed',
  bottom: 16,
  width: 352,

  [theme.breakpoints.up('sm')]: {
    position: 'static',
    mt: 5,
  },
});

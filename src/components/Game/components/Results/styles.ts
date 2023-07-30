import { alpha, SxProps, Theme } from '@mui/material';

export const backdrop: SxProps<Theme> = {
  background: ({ palette }) => alpha(palette.background.default, 0.8),
  flexDirection: 'column',
  justifyContent: 'start',
  pt: 30,
};

export const name: SxProps = {
  mx: 0.5,
  fontWeight: 600,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

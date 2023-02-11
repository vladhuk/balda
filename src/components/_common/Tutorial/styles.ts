import { SxProps, Theme } from '@mui/material';

export const closeButton: SxProps = {
  position: 'absolute',
  top: 0,
  right: [0, 0, '25%'],
};

export const screenshot: SxProps = {
  width: [150, 200, 200, 220],
};

export const keyImage: SxProps = {
  height: 30,
};

export const backdrop: SxProps<Theme> = ({ zIndex, palette }) => ({
  zIndex: zIndex.drawer,
  background: palette.background.default,
  alignItems: 'start',
  overflow: 'auto',
  height: 1,
  pb: 2,
});

export const heading: SxProps = {
  textAlign: 'center',
  fontWeight: 600,
  my: 2,
};
